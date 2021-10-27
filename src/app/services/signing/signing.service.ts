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

  /**
   * Es el servicio que se utiliza para enviar el código de validación
   * @param params El parametro seria el número de celular
   */
  sendDinamicKey(params) {
    return this.http.post('/webresources/firma/codigo-otp-cel', params)
  }

  /**
   * Este servicio sirve para validar la otp
   * @param params recibe como parametros el número de celular y el OTP
   */
  validateDinamicKey(params) {
    return this.http.post('/webresources/firma/validar-otp-cel', params)
  }


  /**
   * Este servicio sirve para firmar los documentos del codeudor
   * @param params recibe como parametros son: la firma, número de solicitud, unidad y tipo
   */
  signing(params) {
    return this.http.post('/webresources/firma/ingresar-firma-code', params)
  }


}
