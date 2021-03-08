import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpService) {}

  validateDeceval(params) {
    return this.http.post('/webresources/deceval/valida-deceval', params)
  }


  sendDinamicKey(params) {
    return this.http.post('/webresources/firma/codigo-otp-cel', params)
  }
  
  validateDinamicKey(params) {
    return this.http.post('/webresources/firma/validar-otp-cel', params)
  }
}
