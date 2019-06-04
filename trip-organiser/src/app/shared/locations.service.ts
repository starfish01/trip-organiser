import { Injectable } from '@angular/core';
import { Location } from '../model/location.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'




@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Location[] = [];
  private locationsUpdated = new Subject<Location[]>();

  constructor(private http:HttpClient, private router: Router) { }

  getLocations() {

    //get Location

    this.locations.push({
      id: '123456',
      title: 'Tokyo',
      startDate: Date.now(),
      endDate: Date.now()
    },
      {
        id: 'somethig',
        title: 'Kyoto',
        startDate: Date.now(),
        endDate: Date.now()
      })

      this.http.get<{message:string, locations: Location,maxPosts:number}>('http://localhost:3000/api/locations')
      .pipe(map((locationData) => {
        return {
          locations: locationData.locations.map(location => {
            return {
              title: location.title,
              startDate: location.startDate,
              id: location._id,
            }
          }), maxPosts: locationData.maxPosts
        }
      }))
      .subscribe((transformedPostData) => {
        this.locations = transformedPostData.locations;
        this.locationsUpdated.next([...this.locations])
      });

  }

  getLocationUpdateListener() {
    return this.locationsUpdated.asObservable();
  }

  getLocation(locationId) {
    //this.persons =  this.personService.getPersons().filter(x => x.id == this.personId)[0];
    const locationData = this.locations.filter( location => location.id == locationId)
    return locationData[0]
  }

  addLocation(loactionData:Location){
    this.http.post<{message:string, locationId}>('http://localhost:3000/api/locations/create',loactionData)
    .subscribe((responseData)=>{
      loactionData.id = responseData.locationId;
      this.locations.push(loactionData)
      this.locationsUpdated.next([...this.locations])
      this.router.navigate(['/'])
    })
  }

}
