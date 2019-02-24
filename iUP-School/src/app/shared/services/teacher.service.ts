import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<any> {
    return this._http.get(`${baseUrl}/teachers/getAll.php`);
  }

  addInfo(data): Observable<any> {
    return this._http.post(`${baseUrl}/teachers/addInfo.php`, data);
  }

  getInfo(id): Observable<any> {
    return this._http.get(`${baseUrl}/teachers/getInfo.php?id=${id}`);
  }
}
