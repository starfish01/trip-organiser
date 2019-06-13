import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import {Restaurant} from '../model/restaurant.model';
const BACKEND_URL = environment.apiURL + '/restaurants/';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Location} from '../model/location.model';
import {map} from "rxjs/operators";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private restaurants: Restaurant[] = [];
  private restaurantsUpdate = new Subject<Restaurant[]>();

  constructor(private http: HttpClient, private  router: Router) { }

  getRestaurants() {
    this.http.get<{ message: string, restaurants: any, maxPosts: number }>(BACKEND_URL)
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


  getRestaurant() {}

  addRestaurant(restaurantData: Restaurant) {
    console.log('title');
    this.http.post<{ message: string, id: string, locationId: string}>(BACKEND_URL + 'create', restaurantData).subscribe((responseData) => {
      console.log(responseData);
      // Need to set up object
      restaurantData.id = responseData.id;
      this.restaurants.push(restaurantData);
      this.restaurantsUpdate.next([...this.restaurants]);

      this.router.navigate([responseData.locationId, 'overview']);

    });
  }
}
