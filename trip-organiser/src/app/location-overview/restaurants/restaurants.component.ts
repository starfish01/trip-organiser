import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestaurantsService} from '../../shared/restaurants.service';
import {Subscription} from 'rxjs';
import {Restaurant} from '../../model/restaurant.model';
import {AuthService} from '../../auth/auth.service';
import {Favourite} from "../../model/favourite.model";


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  @Input('locationID') locationId: string;
  @Input('tripId') tripId: string;
  isFavourite = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private authService: AuthService) {
  }

  restaurants: Restaurant[] = [];
  private restaurantSubs: Subscription;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.restaurantSubs = this.restaurantService.getRestaurantUpdateListener().subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.isLoading = false;
      this.checkFavoriteStatus();
      this.totalUsersFavorite();
    });
    this.restaurantService.getRestaurants(this.tripId);
  }

  ngOnDestroy(): void {
    this.restaurantSubs.unsubscribe();
  }


  onClickAddRestaurant(): void {
    this.router.navigate([this.locationId, 'restaurant', 'add']);
  }

  onEditClick(restaurantId) {
    this.router.navigate([this.locationId, 'restaurant', 'edit', restaurantId]);
  }

  onFavoriteClick(restaurantId) {

    const index = this.restaurants.findIndex(el => el.id === restaurantId);
    const uid = this.authService.getUserId();
    const restaurant = this.restaurants[index];

    const favouriteData: Favourite = {
      location: this.locationId,
      refResSite: restaurantId,
      uid,
      favourite: new Date().toString()
    };

    this.restaurantService.favouriteRestaurant(favouriteData, restaurant.id);
  }


  private checkFavoriteStatus() {
    const uid = this.authService.getUserId();
    for (let i = 0; i < this.restaurants.length; i++) {
      const currentUserIndex = this.restaurants[i].usersWhoLike.findIndex(el => el.uid === uid);
      if (currentUserIndex === -1) {
        this.restaurants[i].currentUserFavourite = false;
      } else {
        const position = this.restaurants[i].usersWhoLike[currentUserIndex].favourite;
        if (position === null) {
          this.restaurants[i].currentUserFavourite = false;
        } else {
          this.restaurants[i].currentUserFavourite = true;
        }
      }

    }
  }

  private totalUsersFavorite() {
    for (const restaurant of this.restaurants) {
      let usersWhoLike = 0;
      for (const user of restaurant.usersWhoLike) {
        if (user.favourite !== null) {
          usersWhoLike++;
        }
      }
      restaurant.totalUserFavourite = usersWhoLike;
      console.log(usersWhoLike);
    }
  }
}
