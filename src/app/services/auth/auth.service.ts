import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userFake = {
    username: 'antojsh',
    password: '1234'
  };

  constructor(private http: HttpService) { }


  login(user: any): Observable<any> {

    let data = `data={ "username": "${this.userFake.username}", "password": "${this.userFake.password}" }`;
    return this.http.post('/webresources/login/singin', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
  }
}
