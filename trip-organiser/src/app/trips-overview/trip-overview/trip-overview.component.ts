import { Component, OnInit } from '@angular/core';
import {TripService} from '../../shared/trip.service';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-trip-overview',
  templateUrl: './trip-overview.component.html',
  styleUrls: ['./trip-overview.component.scss']
})
export class TripOverviewComponent implements OnInit {

  trip = null;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      new Promise((res, rej) => {
        res(this.tripService.getTrip(params.trip));
      }).then((data) => {
        if (data === null) {
          alert('The trip could not be found');
          this.router.navigate(['/home']);
        } else {
          this.trip = data
        }
      }).catch((err) => {
      });
    });
  }

}
