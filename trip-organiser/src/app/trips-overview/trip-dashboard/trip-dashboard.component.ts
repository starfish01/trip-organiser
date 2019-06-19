import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/shared/trip.service';
import { Trip } from 'src/app/model/trip.model';

@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.scss']
})
export class TripDashboardComponent implements OnInit {

  trip:Trip = null;

  constructor(private tripService:TripService) { }

  ngOnInit() {
    this.trip = this.tripService.getTrip()
    console.log(this.trip)
    // console.log(this.tripService.getTrip())
  }

}
