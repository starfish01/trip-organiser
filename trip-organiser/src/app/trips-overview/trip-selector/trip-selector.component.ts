import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'src/app/model/trip.model';
import { TripService } from 'src/app/shared/trip.service';

@Component({
  selector: 'app-trip-selector',
  templateUrl: './trip-selector.component.html',
  styleUrls: ['./trip-selector.component.scss']
})
export class TripSelectorComponent implements OnInit {

  @Input('tripData') trip: Trip;


  constructor(private tripService:TripService) { }

  ngOnInit() {
  }

  onTripSelect(id){
    this.tripService.selectTrip(id);
  }

}
