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


}

