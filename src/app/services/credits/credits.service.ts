import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ISimulator, IPreApplication } from '../../models/credits.model';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private http: HttpService) { }


  simulate(data: ISimulator) {
    return this.http.post('/webresources/loans/approximate_fee', data);
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



  loadCitys(cod_dpto) {
    return this.http.post('/webresources/form/get_city', { cod_dpto })
  }

}

