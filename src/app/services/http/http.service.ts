import { Injectable } from '@angular/core';
import {
  HttpHeaders, HttpClient, HttpInterceptor, HttpRequest,
  HttpResponse, HttpEvent, HttpErrorResponse, HttpHandler
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, options?: any): Observable<any> {
    return this.http
      .get(this.buildUrl(url), this.optionsRequest(options))
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return this.http
      .post(this.buildUrl(url), this.buildBody(body), this.optionsRequest(options))
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return this.http
      .put(this.buildUrl(url), this.buildBody(body), this.optionsRequest(options))
  }

  delete(url: string, body: any): Observable<any> {
    return this.http
      .delete(this.buildUrl(url), body)
  }


  private buildBody(body) {
    return localStorage.getItem('saggic_id') ? { ...body, sagicc_id: localStorage.getItem('saggic_id') } : body
  }

  private optionsRequest(options) {
    console.log(options);
    return options ?
      options : {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authentication': String(localStorage.getItem('token')) || null,
          'version': '2.0'
        })
      }
  }

  private buildUrl(url: string) {
    return url.startsWith('http') ? url : environment.apiPath + url
  }


}
