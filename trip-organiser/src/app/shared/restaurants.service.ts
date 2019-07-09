import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {Restaurant} from '../model/restaurant.model';

const BACKEND_URL = environment.apiURL + '/restaurants/';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location as LOCO} from '@angular/common';
import {Favourite} from '../model/favourite.model';


@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private restaurants: Restaurant[] = [];
  private restaurantsUpdate = new Subject<Restaurant[]>();

  private favouriteRestaurants: Favourite[] = [];
  private favouriteRestaurantUpdate = new Subject<Favourite[]>();

  constructor(private http: HttpClient, private  router: Router, private _location: LOCO) {
  }

  getRestaurants(tripId) {
    this.http.get<{ message: string, restaurants: any, maxPosts: number }>(BACKEND_URL + tripId)
      .pipe(map((restaurantData) => {
        return {
          restaurants: restaurantData.restaurants.map(restaurant => {
              return {
                id: restaurant._id,
                restaurantTitle: restaurant.restaurantTitle,
                cuisine: restaurant.cuisine,
                restaurantLocation: restaurant.restaurantLocation,
                restaurantDescription: restaurant.restaurantDescription,
                restaurantCost: restaurant.restaurantCost,
                restaurantLocationRef: restaurant.restaurantLocationRef,
                restaurantUrl: restaurant.restaurantUrl,
                created_at: restaurant.created_at,
                updatedAt: restaurant.updatedAt,
                currentUserFavourite: false,
                totalUserFavourite: 0,
              };
            }
          ),
          maxPosts: restaurantData.maxPosts
        };
      })).subscribe((transformedRestaurantData) => {
      this.restaurants = transformedRestaurantData.restaurants;
      this.restaurantsUpdate.next([...this.restaurants]);
    });
  }

  getFavouriteRestaurants(tripId) {
    this.http.get<{ message: string, favRestaurants: Favourite[] }>(BACKEND_URL + 'favourite/get/' + tripId).subscribe((response) => {
      console.log(response.favRestaurants)
      this.favouriteRestaurants = response.favRestaurants;
      this.favouriteRestaurantUpdate.next([...this.favouriteRestaurants]);
    });
  }

  getRestaurantUpdateListener() {
    return this.restaurantsUpdate.asObservable();
  }

  getFavouriteRestaurantUpdateListener() {
    return this.favouriteRestaurantUpdate.asObservable();
  }

  updateRestaurant(restaurantData: Restaurant, restaurantId) {

    if (restaurantData.restaurantUrl !== '') {
      if (restaurantData.restaurantUrl[0] !== 'h' && restaurantData.restaurantUrl[1] !== 't' && restaurantData.restaurantUrl[2] !== 't' && restaurantData.restaurantUrl[3] !== 'p') {
        restaurantData.restaurantUrl = 'https://' + restaurantData.restaurantUrl;
      }
    }

    this.http.put<{ message: string }>
    (BACKEND_URL + restaurantData.id, restaurantData).subscribe((responseData) => {
      const index = this.restaurants.findIndex(x => x.id === restaurantData.id);
      this.restaurants[index] = restaurantData;
      this.restaurantsUpdate.next([...this.restaurants]);
      this._location.back();
    });
  }


  getRestaurant(restaurantId) {
    return this.restaurants.find(x => x.id === restaurantId);
  }

  addRestaurant(restaurantData: Restaurant) {
    this.http.post<{ message: string, id: string, locationId: string }>
    (BACKEND_URL + 'create', restaurantData).subscribe((responseData) => {
      // Need to set up object
      restaurantData.id = responseData.id;
      this.restaurants.push(restaurantData);
      this.restaurantsUpdate.next([...this.restaurants]);
      this._location.back();
    });
  }

  deleteRestaurant(restaurantId, locationId) {
    this.http.delete<{ message: string }>(BACKEND_URL + restaurantId).subscribe((responseData) => {
      const index = this.restaurants.findIndex(x => x.id === restaurantId);
      this.restaurants.splice(index, 1);
      this.restaurantsUpdate.next([...this.restaurants]);
      this._location.back();
    });
  }

  favouriteRestaurant(data, restaurantId) {

    this.http.post<{ message: string, favId: string; }>(BACKEND_URL + 'favourite/' + restaurantId, data).subscribe((response) => {

      if (response.favId) {
        data._id = response.favId;
        this.favouriteRestaurants.push(data);
      } else {
        const favElement = this.favouriteRestaurants.filter((favRes) => {
          return (favRes.uid === data.uid && favRes.refResSite === data.refResSite);
        });

        const favId = favElement[0]._id;
        const favIndex = this.favouriteRestaurants.findIndex(el => el._id === favId);
        this.favouriteRestaurants[favIndex].favourite = data.favourite;
      }

      this.favouriteRestaurantUpdate.next([...this.favouriteRestaurants]);

    });
  }

}
