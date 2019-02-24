import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private _http: HttpClient) {}

  saveInfo(data, id: number = 0): Observable<any> {
    return this._http.post(
      `${baseUrl}/business/addBusinessInfo.php?id=${id}`,
      data
    );
  }

  getSupplierInfo(usersId): Observable<any> {
    return this._http.get(
      `${baseUrl}/business/getSupplierInfo.php?id=${usersId}`
    );
  }

  getSupplierInfoById(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/business/getSupplierInfoById.php?id=${id}`
    );
  }

  uploadLogo(data): Observable<any> {
    return this._http.post(`${baseUrl}/business/manageLogo.php`, data);
  }
}
