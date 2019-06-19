import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/shared/trip.service';
import { Trip } from 'src/app/model/trip.model';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.scss']
})
export class TripDashboardComponent implements OnInit {

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
        console.log(err)
      })
    });
  }

}
