import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
const baseUrl = `${environment.baseUrl}/activities`;

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private _http: HttpClient) {}

  getActivities(): Observable<any> {
    return this._http.get(`${baseUrl}/getActivities.php`);
  }

  getEachActivity(id): Observable<any> {
    return this._http.get(`${baseUrl}/getEachActivity.php?id=${id}`);
  }

  createActivity(data, id: number = 0): Observable<any> {
    return this._http.post(`${baseUrl}/createActivity.php?id=${id}`, data);
  }

  deleteActivity(id): Observable<any> {
    return this._http.get(`${baseUrl}/deleteActivity.php?id=${id}`);
  }

  getNearEvent(): Observable<any> {
    return this._http.get(`${baseUrl}/getNearEvent.php`);
  }
}
