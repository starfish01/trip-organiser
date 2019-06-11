import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  isFavourite: boolean = false;
  // locationId: string;

  @Input('locationID') locationId: string;

  constructor(private router: Router, public route: ActivatedRoute) {}

  ngOnInit() {

  }

  onClickAddRestaurant(): void {
    // ':id/restaurant/add',
    this.router.navigate([this.locationId, 'restaurant', 'add']);
  }

  onEditClick(){
    this.router.navigate([this.locationId, 'restaurant', 'edit', this.locationId]);
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  onFavoriteClick(){
    this.isFavourite = !this.isFavourite;
  }


}
