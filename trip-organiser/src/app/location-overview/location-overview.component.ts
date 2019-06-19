import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '../model/location.model';
import { Subscription } from 'rxjs';
import { LocationsService } from '../shared/locations.service';

@Component({
  selector: 'app-location-trip-overview',
  templateUrl: './location-overview.component.html',
  styleUrls: ['./location-overview.component.scss']
})
export class LocationOverviewComponent implements OnInit, OnDestroy {


  tabIndex = 0;
  locationParamId: string = null;
  locationSelected: Location = null;
  paramsSubscription: Subscription;



  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationsService) {
  }

  isMobile = false;
  locationURL: string;

  private static getIsMobile(): boolean {
    const w = window.innerWidth + 84;
    const breakpoint = 920;
    return w < breakpoint;
  }

  ngOnInit() {

    this.isMobile = LocationOverviewComponent.getIsMobile();
    window.onresize = () => {
      this.isMobile = LocationOverviewComponent.getIsMobile();
      console.log(this.isMobile);
    };


    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.locationParamId = params.location;
      this.getLocationData();
    });
    this.route.queryParams.subscribe((queryParams: Params) => {
      if (queryParams.position === 'place') {
        this.tabIndex = 0;
      } else if (queryParams.position === 'food') {
        this.tabIndex = 1;
      }
    });

  }

  getLocationData() {
    this.locationService.getLocation(this.locationParamId).subscribe(locationData => {
      if (!locationData.location) {
        this.router.navigate(['']);
        console.log('invalid route');
      }
      this.locationSelected = locationData.location;
      this.locationURL = 'https://maps.google.com/maps?q=' + this.locationSelected.title + '&t=&z=13&ie=UTF8&iwloc=&output=embed';
    });
  }

  ngOnDestroy(): void {
  }


}
