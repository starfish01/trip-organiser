import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from '../model/auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';

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


  constructor(private http: HttpClient, private router: Router) {
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password,
      firstName: null,
      lastName: null,
      lastLogin: 1,
      emailValidated: false,
      loginCounter: 1,
    };
    return this.http.post(BACKEND_URL + '/signup', authData).subscribe(() => {
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
    this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
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

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
  }
}
