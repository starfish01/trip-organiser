import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from './../model/location.model';
import { Subscription } from 'rxjs';
import { LocationsService } from '../shared/locations.service';

@Component({
  selector: 'app-trip-overview',
  templateUrl: './trip-overview.component.html',
  styleUrls: ['./trip-overview.component.scss']
})
export class TripOverviewComponent implements OnInit {

  locationParamId: string = null;
  locationSelected: Location = null;
  paramsSubscription: Subscription;


  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationsService) { }

  ngOnInit() {
    // this.locationParamId = this.route.snapshot.params['location'];

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.locationParamId = params['location']
      this.getLocationData()
    })
  }

  getLocationData() {
    this.locationService.getLocation(this.locationParamId).subscribe(locationData => {
      if (!locationData.location) {
        this.router.navigate([''])
        console.log('invalid route')
      }
      this.locationSelected = locationData.location
    });

  }

}
