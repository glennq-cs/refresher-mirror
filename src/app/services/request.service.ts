import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _apiEndpoint: string = '';

  constructor(
    private _httpClient: HttpClient,
    private _globalService: GlobalService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._apiEndpoint = this._router.url + '/api/';
  }

  get(url = ''): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + url, { headers: this.getHeader() });
  }

  post(url = '',  data = {}): Observable<any> {
    return this._httpClient.post(this._apiEndpoint + url, data, { headers: this.getHeader() });
  }

  put(url = '',  data = {}) {
    return this._httpClient.put(this._apiEndpoint + url, data, { headers: this.getHeader() });
  }

  delete(url = '') {
    return this._httpClient.delete(this._apiEndpoint + url, { headers: this.getHeader() });
  }

  private getHeader() {
    return new HttpHeaders({'Authorization': 'Bearer ' + this._globalService.getToken() });
  }
}
