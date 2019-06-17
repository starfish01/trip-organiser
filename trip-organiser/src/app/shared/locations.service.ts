import { Injectable } from '@angular/core';
import { Location } from '../model/location.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiURL + '/locations/';



@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Location[] = [];
  private locationsUpdated = new Subject<Location[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getLocations() {
    this.http.get<{ message: string, locations: any, maxPosts: number }>(BACKEND_URL)
      .pipe(map((locationData) => {
        return {
          locations: locationData.locations.map(location => {
            return {
              title: location.title,
              startDate: new Date(location.startDate * 1000),
              endDate: new Date(location.endDate * 1000),
              id: location._id,
              stay: location.stay,
            };
          }
          ),
          maxPosts: locationData.maxPosts
        };
      }))
      .subscribe((transformedPostData) => {
        console.log('2');
        this.locations = transformedPostData.locations;
        this.locationsUpdated.next([...this.locations]);
      });
  }

  getLocationUpdateListener() {
    return this.locationsUpdated.asObservable();
  }

  getLocation(locationId) {
    // internal search
    this.locations.forEach((obj) => {
      if (obj.id === locationId) {
        return obj;
      }
    });
    return this.http.get<{ location: any }>(BACKEND_URL + locationId);
  }

  locationCheck(locationId) {
    return this.locations.some(el => el.id === locationId);
  }

  addLocation(locationData: Location) {
    this.http.post<{ message: string, id: string }>(BACKEND_URL + 'create', locationData)
      .subscribe((responseData) => {
        console.log(responseData);
        locationData.id = responseData.id;
        this.locations.push(locationData);
        this.locationsUpdated.next([...this.locations]);
        this.router.navigate(['/']);
      });
  }

  updateLocation(locationData: Location, locationId: string) {
    this.http.put<{ message: string }>(BACKEND_URL + locationId, locationData).subscribe(response => {
      this.router.navigate(['/']);

      const index = this.locations.findIndex(x => x.id === locationId);
      this.locations[index] = locationData;

      this.locationsUpdated.next([...this.locations]);
    });
  }

  deleteLocation(locationId) {

    this.http.delete<{ message: string }>(BACKEND_URL + locationId).subscribe(response => {
      this.router.navigate(['/']);

      const index = this.locations.findIndex((loc, i) => {
        return loc.id === locationId;
      });

      this.locations.splice(index, 1);

      this.locationsUpdated.next([...this.locations]);

    });

  }

}