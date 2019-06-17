import { Injectable } from '@angular/core';
import { Trip } from '../model/trip.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiURL + '/trips/';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  private trips: Trip[] = [];
  private tripUpdate = new Subject<Trip[]>();

  constructor(private http: HttpClient) { }

  getTripUpdateListener() {
    return this.tripUpdate.asObservable();
  }

  addTrip(trip: Trip) {
    this.http.post<{ message: string, id: string }>(BACKEND_URL + 'create', trip).subscribe((response) => {
      console.log(response)
      this.trips.push(trip)
      this.tripUpdate.next([...this.trips])
    })


  }

}
