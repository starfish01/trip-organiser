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

  getLocations(){

    //get Location

    this.locations.push({
      id:'123456',
      title:'Tokyo'
    },
    {
      id:'somethig',
      title:'Kyoto'
    })

    this.locationsUpdated.next([...this.locations])
  }

  getLocationUpdateListener(){
    return this.locationsUpdated.asObservable();
  }

}
