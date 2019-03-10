import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  constructor(private _http: HttpClient) {}

  getPupils(id): Observable<any> {
    return this._http.get(`${baseUrl}/parents/getPupils.php?id=${id}`);
  }

  getParents(): Observable<any> {
    return this._http.get(`${baseUrl}/parents/getAll.php`);
  }

  createAccout(data): Observable<any> {
    return this._http.post(`${baseUrl}/parents/createAccount.php`, data);
  }

  addInfo(data, id: number = 0): Observable<any> {
    return this._http.post(`${baseUrl}/parents/addInfo.php?id=${id}`, data);
  }
}
