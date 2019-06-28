import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from "rxjs";
import {Attendee} from "../model/attendee";
import {map} from "rxjs/operators";

const BACKEND_URL = environment.apiURL + '/user-information/';

@Injectable({
  providedIn: 'root'
})
export class UsersInformationService {

  private attendeeList: Attendee[] = [];
  private attendeeListUpdated = new Subject<Attendee[]>();


  constructor(private http: HttpClient, private router: Router) {
  }

  getAttendeeListUpdateListener() {
    return this.attendeeListUpdated.asObservable();
  }

  getListOfUsers(ids: string[]) {

    const data = JSON.stringify(ids);

    this.http.get<{ message: string, usersNames: [] }>(BACKEND_URL + 'user-list/' + data)
      .subscribe((userData) => {
        console.log(userData.usersNames)
        this.attendeeList = userData.usersNames;
        this.attendeeListUpdated.next([...this.attendeeList]);
      });
  }

  findAndUser(userEmailAndTripId) {

    this.http.post<{message: string, userData: Attendee}>(BACKEND_URL + 'addusertotrip', userEmailAndTripId)
      .subscribe((data) => {
          // Check if user exists

          const inArray = this.attendeeList.some((elem) => {
            return elem.id === data.userData.id;
          });

          if (!inArray) {
            this.attendeeList.push(data.userData);
          }
          this.attendeeListUpdated.next([...this.attendeeList]);
      });
  }

  removeUserFromTrip(userData) {
    this.http.post<{message: string, userData: Attendee}>(BACKEND_URL + 'remove-user-from-trip',userData)
      .subscribe();
    console.log(userData);
  }
}
