import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestaurantsService} from "../../shared/restaurants.service";
import {Location} from "../../model/location.model";
import {Subscription} from "rxjs";
import {Restaurant} from "../../model/restaurant.model";


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  @Input('locationID') locationId: string;
  isFavourite: boolean = false;

  constructor(private router: Router, public route: ActivatedRoute, private restaurantService: RestaurantsService) {}

  restaurants: Restaurant[] = [];
  private restaurantSubs: Subscription;
  isLoading: Boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.restaurantSubs = this.restaurantService.getRestaurantUpdateListener().subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.isLoading = false;
      console.log(this.restaurants);
    });
    this.restaurantService.getRestaurants();
  }

  ngOnDestroy(): void {
    this.restaurantSubs.unsubscribe();
  }

  getRestaurants() {

  }

  onClickAddRestaurant(): void {
    this.router.navigate([this.locationId, 'restaurant', 'add']);
  }

  onEditClick(restaurantId) {
    this.router.navigate([this.locationId, 'restaurant', 'edit', restaurantId]);
  }

  onFavoriteClick(){
    this.isFavourite = !this.isFavourite;
  }


}
