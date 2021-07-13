import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ISimulator, IPreApplication, listFile } from '../../models/credits.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpService) { }

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

  deleteFile(data: listFile) {
    return this.http.get(environment.fintra + '/EndPointCoreServlet?'
      + 'option=' + data.option
      + '&numero_solicitud=' + data.numero_solicitud
      + '&user=' + data.user
      + '&und_negocio=' + data.und_negocio
      + '&id_archivo=' + data.id_archivo, this.options);
  }

  uploadImage(data, options) {
    return this.http.post('/FileUploadServlet', data, options);
  }

  registerUser(data) {
    console.log(data);
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


  planDePagos(numero_solicitud){
    return this.http.get(environment.fintra + '/EndPointCoreServlet?'+"option=5&user="+numero_solicitud+"&numsolc="+numero_solicitud+"", this.options)
  }

}

