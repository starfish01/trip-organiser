import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/shared/trip.service';
import { Trip } from 'src/app/model/trip.model';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-trip-parent',
  templateUrl: './trip-parent.component.html',
  styleUrls: ['./trip-parent.component.scss']
})
export class TripParentComponent implements OnInit {

  trip = null;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      new Promise((res, rej) => {
        res(this.tripService.getTrip(params.trip))
      }).then((data) => {
        if (data === null) {
          alert('The trip could not be found');
          this.router.navigate(['/home'])
        } else {
          this.trip = data
        }
      }).catch((err) => {
      });
    });
  }


//   animations: [
//     trigger ('slideInOut', [
//     transition (':enter', [
//       style({transform: 'translateY(-100%)'}),
//       animate ('200ms ease-in', style({transform: 'translateY(0%)'}))
//     ]),
//   transition (':leave', [
//     animate ('200ms ease-in', style({transform: 'translateY(-100%)'}))
//     ])
// ])
// ]

}
