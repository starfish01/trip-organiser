import {Injectable} from '@angular/core';
import {Trip} from '../model/trip.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


const BACKEND_URL = environment.apiURL + '/trips/';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  private trips: Trip[] = [];
  private tripUpdate = new Subject<Trip[]>();

  private selectedTrip: Trip = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  selectTrip(tripId) {
    this.selectedTrip = this.trips.find(x => x.id === tripId);
    if (this.selectedTrip) {
      this.router.navigate([this.selectedTrip.id]);
    } else {
      this.selectedTrip = null;
    }
  }

  getSelectedTripId() {
    if (this.selectedTrip) {
      return this.selectedTrip.id;
    } else {
      return this.router.url.split('/')[1];
    }
  }


  getTrip(id) {
    // internal search
    this.trips.forEach((obj) => {
      if (obj.id === id) {
        return obj;
      }
    });

    return this.http.get<{ message: string, trip: any }>(BACKEND_URL + id);
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
              };
            }
          )
        };
      }))
      .subscribe((transformedData) => {
          this.trips = transformedData.trips;
          this.tripUpdate.next([...this.trips]);
        }
      );
  }

  addTrip(trip: Trip) {
    this.http.post<{ message: string, id: string }>(BACKEND_URL + 'create', trip).subscribe((response) => {
      trip.id = response.id;
      this.trips.push(trip);
      this.tripUpdate.next([...this.trips]);
    });
  }

}
