import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {Restaurant} from '../model/restaurant.model';

const BACKEND_URL = environment.apiURL + '/restaurants/';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location as LOCO} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private restaurants: Restaurant[] = [];
  private restaurantsUpdate = new Subject<Restaurant[]>();

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
                usersWhoLike: restaurant.usersWhoLike,
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

  getRestaurantUpdateListener() {
    return this.restaurantsUpdate.asObservable();
  }

  updateRestaurant(restaurantData: Restaurant, restaurantId) {
    this.http.put<{ message: string }>
    (BACKEND_URL + restaurantData.id, restaurantData).subscribe((responseData) => {
      console.log(responseData);
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
      console.log(responseData);
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
    this.http.post<{ message: string, data: any }>(BACKEND_URL + 'favourite/' + restaurantId, data).subscribe((response) => {
      console.log(data);
      const usersWhoLike = this.restaurants[this.restaurants.findIndex(el => el.id === restaurantId)].usersWhoLike;
      const indexOfUser = usersWhoLike.findIndex(el => el.uid === data.uid);
      usersWhoLike[indexOfUser] = data;
      this.restaurantsUpdate.next([...this.restaurants]);
    });
  }

}
