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

  getProvinceList(): Observable<any> {
    return this._http.get(`${baseUrl}/address/getProvince.php`);
  }

  getCityList(): Observable<any> {
    return this._http.get(`${baseUrl}/address/getCity.php`);
  }

  getBrgyList(): Observable<any> {
    return this._http.get(`${baseUrl}/address/getBrgy.php`);
  }
}
