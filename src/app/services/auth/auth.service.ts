import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpService } from '../http/http.service';
// import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  login(user: any): Observable<any> {
    return this.http.post('/webresources/login/signin-v0.1', user)
  }

  sendIdByRecovery(identificacion: String): Observable<any> {
    return this.http.post('/webresources/login/recovery', { identificacion })
  }

  sendRecoveryMethod(data) {
    return this.http.post('/webresources/login/recovery_code', data)
  }

  isAuthenticated() {
    return localStorage.getItem('user') ? true : false;
  }

  get token() {
    return of(localStorage.getItem('token') ? localStorage.getItem('token') : null);
  }

  set token(token: any) {
    localStorage.setItem("token", token)
  }

}
