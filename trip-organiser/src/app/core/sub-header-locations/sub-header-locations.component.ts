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
  private locationSubs:Subscription

  ngOnInit() {
    // this.locationsService.getLocations()
    this.locationSubs = this.locationsService.getLocationUpdateListener().subscribe((locations:Location[])=>{
      this.locations = locations
      console.log(locations)
    })
    this.locationsService.getLocations()
  }

  ngOnDestroy(): void {
    this.locationSubs.unsubscribe();
  }


  onLocationClick(locationId){
    this.router.navigateByUrl(locationId)
    console.log(locationId)
  }


}
