import { Injectable } from '@angular/core';
import { Location } from '../model/location.model'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Content } from '@angular/compiler/src/render3/r3_ast';





@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Location[] = [];
  private locationsUpdated = new Subject<Location[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getLocations() {

    this.http.get<{ message: string, locations: any, maxPosts: number }>('http://localhost:3000/api/locations')
      .pipe(map((locationData) => {
        return {
          locations: locationData.locations.map(location => {
            return {
              title: location.title,
              startDate: new Date(location.startDate * 1000),
              endDate: new Date(location.endDate * 1000),
              id: location._id,
            }
          }
          ),
          maxPosts: locationData.maxPosts
        }
      }))
      .subscribe((transformedPostData) => {
        console.log('2')
        this.locations = transformedPostData.locations;
        this.locationsUpdated.next([...this.locations])
      });
  }

  getLocationUpdateListener() {
    return this.locationsUpdated.asObservable();
  }

  getLocation(locationId) {
    //internal search
    this.locations.forEach((obj)=>{
      if(obj.id == locationId){
        return obj
      }
    })

    return this.http.get<{ location: any }>("http://localhost:3000/api/locations/" + locationId)
  }

  addLocation(loactionData: Location) {
    this.http.post<{ message: string, locationId }>('http://localhost:3000/api/locations/create', loactionData)
      .subscribe((responseData) => {
        loactionData.id = responseData.locationId;
        this.locations.push(loactionData)
        this.locationsUpdated.next([...this.locations])
        this.router.navigate(['/'])
      })
  }

}
