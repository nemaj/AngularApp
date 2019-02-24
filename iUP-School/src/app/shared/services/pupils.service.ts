import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = `${environment.baseUrl}/pupils`;

@Injectable({
  providedIn: 'root'
})
export class PupilsService {
  constructor(private _http: HttpClient) {}

  getInfo(id): Observable<any> {
    return this._http.get(`${baseUrl}/getInfo.php?id=${id}`);
  }

  preEnroll(data): Observable<any> {
    return this._http.post(`${baseUrl}/preEnroll.php`, data);
  }

  enrollNow(id): Observable<any> {
    return this._http.get(`${baseUrl}/enrollPupil.php?id=${id}`);
  }

  getPreEnroll(): Observable<any> {
    return this._http.get(`${baseUrl}/getPreEnroll.php`);
  }

  getEnrolled(): Observable<any> {
    return this._http.get(`${baseUrl}/getEnrolled.php`);
  }

  addPupil(data): Observable<any> {
    return this._http.post(`${baseUrl}/addPupil.php`, data);
  }
}
