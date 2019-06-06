import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationsService } from 'src/app/shared/locations.service';
import { Location } from '../../model/location.model'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sub-header-locations',
  templateUrl: './sub-header-locations.component.html',
  styleUrls: ['./sub-header-locations.component.scss']
})
export class SubHeaderLocationsComponent implements OnInit, OnDestroy {

  constructor(private locationsService:LocationsService, private router: Router) { }

  locations: Location[] = [];
  private locationSubs:Subscription;
  isLoading: Boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.locationSubs = this.locationsService.getLocationUpdateListener().subscribe((locations:Location[])=>{
      this.locations = locations
      this.isLoading = false;
    })
    this.locationsService.getLocations()
  }

  ngOnDestroy(): void {
    this.locationSubs.unsubscribe();
  }


  onLocationClick(locationId){
    this.router.navigateByUrl(locationId)
  }


}
