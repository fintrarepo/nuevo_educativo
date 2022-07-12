import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ISimulator, IPreApplication, listFile } from '../../models/credits.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private messages: any = [];
  private dataOto = new BehaviorSubject<any>([]);

  dataOto$ = this.dataOto.asObservable();

  constructor(private http: HttpService) { }

  addMessage(message: any) {
    // this.messages = [message];
    this.dataOto.next(message);
  }

  simulateNotToken(data) {
    return this.http.post('/webresources/loans/approximate_fee', data);
  }

  simulate(data: ISimulator) {
    return this.http.post('/webresources/loans/approximate_fee-2', data);
  }

  simulateRenewCredit(data: ISimulator) {
    return this.http.post('/webresources/loans/payment_settlement', data);
  }

  send(data: IPreApplication) {
    return this.http.put('/webresources/loans/edu-pre-approved', data);
  }

  getNegocio(data: any) {
    return this.http.put('/webresources/firma/obtener-negocio', data);
  }

  send2(data) {
    return this.http.put('/webresources/loans/edu-pre-approved-2', data);
  }

  saveSimulation(data) {
    return this.http.put('/webresources/form/save_simulation', data);
  }
  updateSimulation(data) {
    return this.http.put('/webresources/form/update_simulation', data);
  }

  updateStateSimulation(data) {
    return this.http.put('/webresources/form/update_state_simulation', data);
  }

  clientExists(_identificacion) {
    return this.http.get('/webresources/loans/validate_customer/' + _identificacion)
  }

  loanHistory(data) {
    return this.http.get('/webresources/loans/loan-history', data);
  }
  
  loadOccupation() {
    return this.http.get('/webresources/form/get_tipo_empleo');
  }

  saveTab(data) {
    return this.http.put('/webresources/form/save_form_edu_tab', data);
  }

  loadInfoForm() {
    return this.http.post('/webresources/form/info_form', null)
  }

  /**
   * 
   * @param id es el id del prospecto
   * @returns un boolean en caso de estar aprobado o no
   */
  checkStatusReconoser(id) {
    return this.http.post('/webresources/form/validar_reconoser', {"id_prospecto":id})
  }

  /**
   * 
   * @param cc es el número de la cedula del cliente
   * 
   * @returns un boolean que nos dice si hay credito en tramite
   */
  checkCredic(cc) {
    return this.http.post('/webresources/form/validar_credito_activo', {"cedula":cc})
  }

  autoComplete(data) {
    return this.http.post('/webresources/form/auto_complete', data)
  }

  loadCitys(cod_dpto) {
    return this.http.post('/webresources/form/get_city', { cod_dpto })
  }

  loadFileList(data: listFile) {
    return this.http.get(environment.fintra + '/EndPointCoreServlet?'
      + 'option=' + data.option
      + '&numero_solicitud=' + data.numero_solicitud
      + '&user=' + data.user
      + '&und_negocio=' + data.und_negocio, this.options);
  }

  aceptarPolitica(data) {
    console.log(data);
    return this.http.post(environment.apifintra + '/api/generic/tk/insertar-tratamiento-educativo', data, true)
  }

  deleteFile(data: listFile) {
    return this.http.get(environment.fintra + '/EndPointCoreServlet?'
      + 'option=' + data.option
      + '&numero_solicitud=' + data.numero_solicitud
      + '&user=' + data.user
      + '&und_negocio=' + data.und_negocio
      + '&id_archivo=' + data.id_archivo, this.options);
  }

  sendOtp() {
    return this.http.get(environment.apiPath + '/webresources/firma/codigo-otp');
  }

  validateOtp(data) {
    return this.http.post('/webresources/firma/validar-otp', data);
  }
  
  signing(data){
    return this.http.post('/webresources/firma/ingresar-firma', data);
  }
  
/**
 * 
 * @param data josn con el número de la solicitud y tipo, en este caso es solicitante
 * @returns 
 */
  commercialFollowUp(data){
    return this.http.post('/webresources/firma/seguimiento-comercial', data);
  }

  notifyError(data){
    return this.http.post('/webresources/firma/fallo-reconser', data);
  }

  uploadImage(data, options) {
    console.log(data)
    return this.http.post('/FileUploadServlet', data, options);
  }

  upload(data, options) {
    return this.http.post('/FileUploadServletEdu', data, options);
  }

  registerUser(data) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put('/webresources/login/create_account', data, options);
  }

  saveReconocerID(data) {
    return this.http.put('/webresources/form/save_reconocer', data)
  }


  planDePagos(numero_solicitud) {
    return this.http.get(environment.fintra + '/EndPointCoreServlet?' + "option=5&user=" + numero_solicitud + "&numsolc=" + numero_solicitud + "", this.options)
  }

  pagare(params) {
    return this.http.post('/webresources/deceval/generar-pagare-pdf', params)
  }

}

