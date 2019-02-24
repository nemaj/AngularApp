import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = `${environment.baseUrl}/grading`;

@Injectable({
  providedIn: 'root'
})
export class GradingService {
  constructor(private _http: HttpClient) {}

  getPupilGrades(id): Observable<any> {
    return this._http.get(`${baseUrl}/getPupilGrades.php?id=${id}`);
  }

  saveDetails(data): Observable<any> {
    return this._http.post(`${baseUrl}/saveGradingDetails.php`, data);
  }

  updateGrades(id): Observable<any> {
    return this._http.get(`${baseUrl}/updateGrades.php?id=${id}`);
  }

  getPupils(level): Observable<any> {
    return this._http.get(`${baseUrl}/getPupils.php?level=${level}`);
  }

  getSubjects(data): Observable<any> {
    return this._http.post(`${baseUrl}/getPupilSubjects.php`, data);
  }

  getGradeDetails(id): Observable<any> {
    return this._http.get(`${baseUrl}/getGradeDetails.php?id=${id}`);
  }
}
