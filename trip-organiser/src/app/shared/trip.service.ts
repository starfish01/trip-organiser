import { Injectable } from '@angular/core';
import { Trip } from '../model/trip.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { map, zip } from 'rxjs/operators';
import { Router } from '@angular/router';


const BACKEND_URL = environment.apiURL + '/trips/';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  private trips: Trip[] = [];
  private tripUpdate = new Subject<Trip[]>();

  private selectedTrip: Trip = null;

  constructor(private http: HttpClient, private router: Router) { }

  selectTrip(tripId) {
    this.selectedTrip = this.trips.find(x => x.id === tripId)
    if (this.selectedTrip) {
      this.router.navigate([this.selectedTrip.id])
    } else {
      this.selectedTrip = null;
    }
  }

  getSelectedTripId() {
    console.log('123')
    console.log(this.selectedTrip.id);
    // return this.selectedTrip.id;

    //need to do the collecting
  }

  getTrip(id) {
    return new Promise((res, rej) => {
      if (this.selectedTrip != undefined) {
        res({ ...this.selectedTrip })
      } else {
        this.http.get<{ message: string, trip: any }>(BACKEND_URL + id).subscribe((data) => {
          if (data.trip != null) {
            const tripData: Trip = {
              id: data.trip._id,
              tripTitle: data.trip.tripTitle
            }
            this.selectedTrip = tripData
            res({ ...tripData });
          } else {
            res(null);
          }
        });
      }
    });
    if (this.selectTrip != undefined) {
      return { ...this.selectedTrip }
    } else {
      this.http.get<{ message: string, trip: any }>(BACKEND_URL + id)
    }
  }

  unselectTrip() {
    this.selectTrip = null;
  }

  getTripUpdateListener() {
    return this.tripUpdate.asObservable();
  }

  getTrips() {
    this.http.get<{ message: string, trips: any }>(BACKEND_URL)
      .pipe(map((tripData) => {
        return {
          trips: tripData.trips.map(trip => {
            return {
              tripTitle: trip.tripTitle,
              id: trip._id
            }
          }
          )
        }
      }))
      .subscribe((transformedData) => {
        this.trips = transformedData.trips
        this.tripUpdate.next([...this.trips])
      }
      )
  }

  addTrip(trip: Trip) {
    this.http.post<{ message: string, id: string }>(BACKEND_URL + 'create', trip).subscribe((response) => {
      this.trips.push(trip)
      this.tripUpdate.next([...this.trips])
    })
  }

}
