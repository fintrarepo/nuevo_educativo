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

  getLoans(identificacion = "") {
    return this.http.post("/webresources/loans/approved", { identificacion });
  }


  getLoan(cod) {
    return this.http.get("/webresources/loans/approved/" + cod);
  }

}
