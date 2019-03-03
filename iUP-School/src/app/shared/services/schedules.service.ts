import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
const baseUrl = `${environment.baseUrl}/schedules`;

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  constructor(private _http: HttpClient) {}

  getSchedulePerClass(id): Observable<any> {
    return this._http.get(`${baseUrl}/getSchedulePerClass.php?id=${id}`);
  }

  getDetails(id): Observable<any> {
    return this._http.get(`${baseUrl}/getDetails.php?id=${id}`);
  }

  createSchedule(data, id: number = 0): Observable<any> {
    return this._http.post(`${baseUrl}/createSchedule.php?id=${id}`, data);
  }

  deleteSchedule(id): Observable<any> {
    return this._http.get(`${baseUrl}/removeSchedule.php?id=${id}`);
  }
}
