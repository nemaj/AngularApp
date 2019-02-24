import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private _http: HttpClient) {}

  getReviewByProduct(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/feedback/getReviewByProduct.php?id=${id}`
    );
  }

  addReview(data, id: number = 0): Observable<any> {
    return this._http.post(
      `${baseUrl}/feedback/writeReview.php?id=${id}`,
      data
    );
  }

  getEachReview(data): Observable<any> {
    return this._http.post(`${baseUrl}/feedback/getEachReview.php`, data);
  }
}
