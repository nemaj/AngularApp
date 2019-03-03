import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(private _http: HttpClient) {}

  getAreas(): Observable<any> {
    return this._http.get(`${baseUrl}/utilities/getAreas.php`);
  }

  addArea(data, id: number = 0): Observable<any> {
    return this._http.post(`${baseUrl}/utilities/addArea.php?id=${id}`, data);
  }

  addLevel(data, id: number = 0): Observable<any> {
    return this._http.post(`${baseUrl}/utilities/addLevel.php?id=${id}`, data);
  }

  deleteArea(id): Observable<any> {
    return this._http.get(`${baseUrl}/utilities/deleteArea.php?id=${id}`);
  }

  getSubjects(): Observable<any> {
    return this._http.get(`${baseUrl}/utilities/getSubjects.php`);
  }

  getLevel(): Observable<any> {
    return this._http.get(`${baseUrl}/utilities/getLevel.php`);
  }

  getSubjectsByLevel(level): Observable<any> {
    return this._http.get(
      `${baseUrl}/utilities/getSubjectsByLevel.php?level=${level}`
    );
  }

  addSubject(data, id: number = 0): Observable<any> {
    return this._http.post(
      `${baseUrl}/utilities/addSubject.php?id=${id}`,
      data
    );
  }

  deleteSubject(id): Observable<any> {
    return this._http.get(`${baseUrl}/utilities/deleteSubject.php?id=${id}`);
  }

  deleteLevel(id): Observable<any> {
    return this._http.get(`${baseUrl}/utilities/deleteLevel.php?id=${id}`);
  }
}
