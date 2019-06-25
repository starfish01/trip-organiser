import { Component, OnInit } from '@angular/core';
import {TripService} from '../../shared/trip.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Trip} from '../../model/trip.model';

@Component({
  selector: 'app-trip-overview',
  templateUrl: './trip-overview.component.html',
  styleUrls: ['./trip-overview.component.scss']
})
export class TripOverviewComponent implements OnInit {

  trip: Trip;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.tripService.getTrip(params.trip).subscribe((data) => {
        this.trip = data.trip;
        console.log(this.trip)
        if(data.trip == null){
          alert('The trip could not be found');
          this.router.navigate(['/home']);
        }
      });
    });
  }

}
