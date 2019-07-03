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
      this.isLoading = false;
    });

    this.favRestaurantsSubs = this.restaurantService.getFavouriteRestaurantUpdateListener().subscribe((fav: Favourite[]) => {
      console.log('update');
      this.favRestaurants = fav;
      for (const restaurant of this.restaurants) {
        let favCount = 0;
        for (const favourite of this.favRestaurants) {
          console.log(this.favRestaurants)
          if (favourite.refResSite === restaurant.id) {
            if (favourite.favourite !== '0') {
              favCount++;
              if (favourite.uid === this.uid) {
                restaurant.currentUserFavourite = true;
              }
            }
          }
        }
        restaurant.totalUserFavourite = favCount;
      }
      this.isLoadingFavs = false;
    });

    this.restaurantService.getRestaurants(this.tripId);
    this.restaurantService.getFavouriteRestaurants(this.tripId);
  }

  ngOnDestroy(): void {
    this.restaurantSubs.unsubscribe();
  }

  onFavoriteClick(restaurantId, userFav, res) {
    this.isLoadingFavs = true;

    console.log('res coming')
    console.log(res)

    const uid = this.authService.getUserId();

    const favouriteData: Favourite = {
      location: this.locationId,
      refResSite: restaurantId,
      uid,
      favourite: new Date().toString(),
      tripId: this.tripId,
      _id: null,
    };



    console.log('userfav '+ userFav )
    if (userFav) {
      favouriteData.favourite = '0';
    }

    this.restaurantService.favouriteRestaurant(favouriteData, restaurantId);
  }


  private checkFavoriteStatus() {
    // const uid = this.authService.getUserId();
    // for (let i = 0; i < this.restaurants.length; i++) {
    //   const currentUserIndex = this.restaurants[i].usersWhoLike.findIndex(el => el.uid === uid);
    //   if (currentUserIndex === -1) {
    //     this.restaurants[i].currentUserFavourite = false;
    //   } else {
    //     const position = this.restaurants[i].usersWhoLike[currentUserIndex].favourite;
    //     if (position === null) {
    //       this.restaurants[i].currentUserFavourite = false;
    //     } else {
    //       this.restaurants[i].currentUserFavourite = true;
    //     }
    //   }
    //
    // }
  }

  private totalUsersFavorite() {
    // for (const restaurant of this.restaurants) {
    //   let usersWhoLike = 0;
    //   for (const user of restaurant.usersWhoLike) {
    //     if (user.favourite !== null) {
    //       usersWhoLike++;
    //     }
    //   }
    //   restaurant.totalUserFavourite = usersWhoLike;
    //   console.log(usersWhoLike);
    // }
  }
}
