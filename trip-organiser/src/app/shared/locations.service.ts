import { Injectable } from '@angular/core';
import { Location } from '../model/location.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Location[] = [];
  private locationsUpdated = new Subject<Location[]>();

  constructor() { }

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

    this.locationsUpdated.next([...this.locations])
  }

  getLocationUpdateListener() {
    return this.locationsUpdated.asObservable();
  }

  getLocation(locationId) {
    //this.persons =  this.personService.getPersons().filter(x => x.id == this.personId)[0];
    const locationData = this.locations.filter( location => location.id == locationId)
    return locationData[0]
  }

}
