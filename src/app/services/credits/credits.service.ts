import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ISimulator, IPreApplication, listFile } from '../../models/credits.model';
import { HttpHeaders } from '@angular/common/http';
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


  simulate(data: ISimulator) {
    return this.http.post('/webresources/loans/approximate_fee-2', data);
  }

  send(data: IPreApplication) {
    return this.http.put('/webresources/loans/edu-pre-approved', data);
  }

  loanHistory(data) {
    return this.http.get('/webresources/loans/loan-history', data);
  }

  saveTab(data) {
    return this.http.put('/webresources/form/save_form_edu_tab', data);
  }

  loadInfoForm() {
    return this.http.post('/webresources/form/info_form', null)
  }

  autoComplete(data) {
    return this.http.post('/webresources/form/auto_complete', data)
  }

  loadCitys(cod_dpto) {
    return this.http.post('/webresources/form/get_city', { cod_dpto })
  }

  loadFileList(data: listFile) {
    return this.http.get('http://piloto.fintra.co:8094/fintra/EndPointCoreServlet?'
      + 'option=' + data.option
      + '&numero_solicitud=' + data.numero_solicitud
      + '&user=' + data.user
      + '&und_negocio=' + data.und_negocio, this.options);
  }

  uploadImage(data, options) {
    return this.http.post('/FileUploadServlet', data, options);
  }

}

