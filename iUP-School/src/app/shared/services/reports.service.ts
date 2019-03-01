import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private _http: HttpClient) {}

  getEnrolled(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/getEnrolled.php`);
  }

  getPreEnrolled(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/getPreEnroll.php`);
  }

  getTeachers(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/getTeachers.php`);
  }

  getClassSchedules(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/getClassSchedules.php`);
  }
}
