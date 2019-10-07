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
    return this.http.post('/webresources/login/signin-v0.1', user);
  }

  sendIdByRecovery(identificacion: String): Observable<any> {
    return this.http.post('/webresources/login/recovery', { identificacion })
  }

  sendRecoveryMethod(data) {
    return this.http.post('/webresources/login/recovery_code', data);
  }

  isAuthenticated() {
    return localStorage.getItem('user') ? true : false;
  }

  changePasswordOfRecovery(data) {
    return this.http.post('/webresources/login/restore_password', data);
  }

  changePassword(data) {
    return this.http.post('/webresources/login/change_password', data)
  }

  get token() {
    return of(localStorage.getItem('token') ? localStorage.getItem('token') : null);
  }

  set token(token: any) {
    localStorage.setItem('token', token);
  }

  get tipo_usuario() {
    return localStorage.getItem('tipo_usuario');
  }

  set tipo_usuario(tipo_usuario: any) {
    localStorage.setItem('tipo_usuario', tipo_usuario);
  }

  get name() {
    return localStorage.getItem('name')
  }

  set name(name: any) {
    localStorage.setItem('name', name);
  }

  get cambio_clave() {
    return of(localStorage.getItem('cambio_clave') ? localStorage.getItem('cambio_clave') : null);
  }

  set cambio_clave(cambio_clave: any) {
    localStorage.setItem('cambio_clave', cambio_clave);
  }


}
