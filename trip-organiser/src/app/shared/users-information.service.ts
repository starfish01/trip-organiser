import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const BACKEND_URL = environment.apiURL + '/user-information/';

@Injectable({
  providedIn: 'root'
})
export class UsersInformationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getListOfUsers(ids: string[]) {

    const data = JSON.stringify(ids);

    return this.http.get<{ message: string, usersNames: [] }>(BACKEND_URL + 'user-list/' + data);

  }
}
