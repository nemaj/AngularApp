import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  constructor(private _http: HttpClient) {}

  getLevel(): Observable<any> {
    return this._http.get(`${baseUrl}/options/getLevel.php`);
  }
}
