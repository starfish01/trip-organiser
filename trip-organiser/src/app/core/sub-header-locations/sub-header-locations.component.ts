import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocationsService} from 'src/app/shared/locations.service';
import {Location} from '../../model/location.model'
import {Subscription} from 'rxjs';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {Trip} from 'src/app/model/trip.model';


@Component({
  selector: 'app-sub-header-locations',
  templateUrl: './sub-header-locations.component.html',
  styleUrls: ['./sub-header-locations.component.scss']
})
export class SubHeaderLocationsComponent implements OnInit, OnDestroy {

  constructor(private locationsService: LocationsService, private router: Router, private route: ActivatedRoute) {
  }

  locations: Location[] = [];
  private locationSubs: Subscription;
  tripSelected: Trip = null;
  isLoading: boolean;
  tripId: string = null;
  isAtOverview: boolean;

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.onLocationSelected();
      this.tripId = params.trip;
    });

    this.locationSubs = this.locationsService.getLocationUpdateListener().subscribe((locations: Location[]) => {
      this.locations = locations;
      this.isLoading = false;
    });
    this.locationsService.getLocations(this.tripId);
  }

  ngOnDestroy(): void {
    this.locationSubs.unsubscribe();
  }


  onLocationClick(locationId) {
    this.router.navigateByUrl(locationId)
  }

  onLocationSelected() {
    setTimeout(() => {
      const urlLength = this.router.url.split('/').length;
      this.isAtOverview = urlLength > 2;
    }, 50);
  }


}
