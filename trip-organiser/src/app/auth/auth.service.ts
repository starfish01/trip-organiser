import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from '../model/auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';
import {last} from "rxjs/operators";

const BACKEND_URL = environment.apiURL + '/users/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  private firstName: string;
  private lastName: string;

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }


  constructor(private http: HttpClient, private router: Router) {
  }

  createUser(email: string, password: string, firstName: string, lastName: string) {
    const authData: AuthData = {
      email,
      password,
      firstName,
      lastName,
      lastLogin: 1,
      emailValidated: false,
      loginCounter: 1,
    };
    return this.http.post(BACKEND_URL + 'signup', authData).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      this.authStatusListener.next(false);
      console.log(error);
    });
  }


  login(email: string, password: string) {
    const authData: AuthData = {
      email,
      password,
      firstName: null,
      lastName: null,
      lastLogin: null,
      emailValidated: false,
      loginCounter: null,
    };
    this.http.post<{ token: string, expiresIn: number, userId: string, firstName: string, lastName: string }>
    (BACKEND_URL + 'login', authData)
      .subscribe(response => {
        console.log(response)
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;

          this.userId = response.userId;
          this.firstName = response.firstName;
          this.lastName = response.lastName;

          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

          this.saveAuthData(token, expirationDate, this.userId, this.firstName, this.lastName);

          this.router.navigate(['/home']);
        }
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.userId = null;
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000);
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.firstName = authInformation.firstName;
      this.lastName = authInformation.lastName;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    // the below will log the user out once the token expires
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, firstName: string, lastName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    if (!token || !expirationDate || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
      firstName,
      lastName,
    };
  }
}
