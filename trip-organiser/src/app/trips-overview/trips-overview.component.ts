import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripService } from '../shared/trip.service';
import { Trip } from '../model/trip.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trips-overview',
  templateUrl: './trips-overview.component.html',
  styleUrls: ['./trips-overview.component.scss']
})
export class TripsOverviewComponent implements OnInit, OnDestroy {

  trips: Trip[] = [];
  private tripsSub: Subscription;
  isReset: boolean = false;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripsSub = this.tripService.getTripUpdateListener().subscribe((data) => {
      this.trips = data
    })
  }

  onTripSubmitted(event){
    this.tripService.addTrip(event)
  }

  ngOnDestroy(): void {
    this.tripsSub.unsubscribe();
  }

}
