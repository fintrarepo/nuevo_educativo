import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ListRequestService {

  constructor(private http: HttpService) { }


  getRequests(etapa = "-2") {
    return this.http.post("/webresources/loans/pre-approved", { etapa: etapa })
  }

  getLoans() {
    return this.http.post("/webresources/loans/approved", null);
  }

}