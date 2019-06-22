import {Component, Input, OnInit} from '@angular/core';
import {TripService} from 'src/app/shared/trip.service';
import {Trip} from 'src/app/model/trip.model';
import {Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import {trigger, transition, animate, style, state} from '@angular/animations';


@Component({
  selector: 'app-trip-parent',
  templateUrl: './trip-parent.component.html',
  styleUrls: ['./trip-parent.component.scss'],
  animations: [
    trigger('EnterLeave', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-100%)', zIndex: -10}),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(100%)', zIndex: -10 }))
      ])
    ])
  ]
})
export class TripParentComponent implements OnInit {

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) {
  }

  trip = null;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      new Promise((res, rej) => {
        res(this.tripService.getTrip(params.trip));
      }).then((data) => {
        if (data === null) {
          alert('The trip .could not be found');
          this.router.navigate(['/home']);
        } else {
          this.trip = data;
        }
      }).catch((err) => {
      });
    });
  }

}
