import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  constructor(private _http: HttpClient) {}

  findPupil(search): Observable<any> {
    return this._http.get(`${baseUrl}/pupils/search.php?search=${search}`);
  }

  paybills(data): Observable<any> {
    return this._http.post(`${baseUrl}/billing/paybills.php`, data);
  }

  getDetails(id): Observable<any> {
    return this._http.get(`${baseUrl}/billing/getPupilDetails.php?id=${id}`);
  }

  addCriteria(data, id: number = 0): Observable<any> {
    return this._http.post(`${baseUrl}/billing/addCriteria.php?id=${id}`, data);
  }

  getCriteria(): Observable<any> {
    return this._http.get(`${baseUrl}/billing/getCriteria.php`);
  }

  deleteCriteria(id): Observable<any> {
    return this._http.get(`${baseUrl}/billing/deleteCriteria.php?id=${id}`);
  }
}
