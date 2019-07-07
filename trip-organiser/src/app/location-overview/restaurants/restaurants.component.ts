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

  private restaurants: Restaurant[] = [];
  private restaurantSubs: Subscription;

  private favRestaurants: Favourite[] = [];
  private favRestaurantsSubs: Subscription;
  private uid;

  isLoading = false;
  isLoadingFavs = false;

  ngOnInit() {
    this.isLoading = true;
    this.isLoadingFavs = true;

    this.uid = this.authService.getUserId();


    this.restaurantSubs = this.restaurantService.getRestaurantUpdateListener().subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.restaurantService.getFavouriteRestaurants(this.tripId);
      this.isLoading = false;
    });

    this.favRestaurantsSubs = this.restaurantService.getFavouriteRestaurantUpdateListener().subscribe((fav: Favourite[]) => {
      for (const restaurant of this.restaurants) {
        let favCount = 0;
        const listOfUserWhoLike: string[] = [];
        for (const favourite of fav) {
          if (favourite.refResSite === restaurant.id) {
            if (favourite.uid === this.uid) {
              if (favourite.favourite !== '0') {
                favCount++;
                listOfUserWhoLike.push(favourite.userName);
                restaurant.currentUserFavourite = true;
              } else {
                restaurant.currentUserFavourite = false;
              }
            } else {
              if (favourite.favourite !== '0') {
                listOfUserWhoLike.push(favourite.userName);
                favCount++;
              }
            }
          }
        }

        restaurant.totalUserFavourite = favCount;
        restaurant.listOfUserWhoLike = listOfUserWhoLike;
      }
      this.restaurants.sort((a, b) =>
        (a.totalUserFavourite < b.totalUserFavourite) ? 1 :
          ((a.totalUserFavourite > b.totalUserFavourite) ? -1 : 0));
      this.isLoadingFavs = false;
    });

    this.restaurantService.getRestaurants(this.tripId);
  }

  ngOnDestroy(): void {
    this.restaurantSubs.unsubscribe();
  }

  onFavoriteClick(restaurantId, userFav, res) {
    this.isLoadingFavs = true;

    const uid = this.authService.getUserId();
    const userName = this.authService.getFirstName() + ' ' + this.authService.getLastName() ;


    const favouriteData: Favourite = {
      location: this.locationId,
      refResSite: restaurantId,
      uid,
      favourite: new Date().toString(),
      tripId: this.tripId,
      _id: null,
      userName,
    };


    if (userFav) {
      favouriteData.favourite = '0';
    }

    this.restaurantService.favouriteRestaurant(favouriteData, restaurantId);
  }

}
