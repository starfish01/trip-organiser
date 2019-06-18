import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'src/app/model/trip.model';
import { TripService } from 'src/app/shared/trip.service';

@Component({
  selector: 'app-trip-overview',
  templateUrl: './trip-overview.component.html',
  styleUrls: ['./trip-overview.component.scss']
})
export class TripOverviewComponent implements OnInit {

  @Input('tripData') trip: Trip;


  constructor(private tripService:TripService) { }

  ngOnInit() {
  }

  onTripSelect(id){
    this.tripService.selectTrip(id);
  }

}
