import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  login(user: any): Observable<any> {
    return this.http.post('/webresources/login/signin-v0.1', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  isAuthenticated() {
    return localStorage.getItem('user') ? true : false;
  }

  get user() {
    return of(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  }

  set user(user: any) {
    localStorage.setItem("user", JSON.stringify(user))
  }

}
