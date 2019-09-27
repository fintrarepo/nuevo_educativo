import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ListRequestService {

  constructor(private http: HttpService) { }


  getRequests() {
    return this.http.get("/webresources/login/signin-v0.1")
  }
}
