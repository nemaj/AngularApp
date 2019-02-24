import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';

const baseUrl = environment.baseUrl;

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<any> {
    return this._http.get(`${baseUrl}/users/getAll.php`);
    // return this._http.get(`${testUrl}/people`);
  }

  getNewSupplier(): Observable<any> {
    return this._http.get(`${baseUrl}/users/getNewSupplier.php`);
  }

  checkCustomerStatus(id): Observable<any> {
    return this._http.get(`${baseUrl}/users/checkCustomerStatus.php?id=${id}`);
  }

  addCustomerInfo(data, id: number = 0): Observable<any> {
    return this._http.post(
      `${baseUrl}/users/addCustomerInfo.php?id=${id}`,
      data
    );
  }

  getUser(id): Observable<any> {
    return this._http.get(`${baseUrl}/users/getEachUser.php?id=${id}`);
  }

  getUserInfo(id): Observable<any> {
    return this._http.get(`${baseUrl}/users/getEachUser.php?id=${id}`);
  }

  getCompleteInfo(id): Observable<any> {
    return this._http.get(`${baseUrl}/users/getUserInfo.php?id=${id}`);
  }

  createUser(data): Observable<any> {
    return this._http.post(`${baseUrl}/users/createUser.php`, data);
  }

  createSupplier(data): Observable<any> {
    return this._http.post(`${baseUrl}/users/createSupplier.php`, data);
  }

  updateUser(data): Observable<any> {
    return this._http.post(`${baseUrl}/users/updateUser.php`, data);
  }

  deleteUser(id): Observable<any> {
    return this._http.get(`${baseUrl}/users/removieUser.php?id=${id}`);
  }

  checkUsername(username): Observable<any> {
    return this._http.post(`${baseUrl}/users/checkUsername.php`, { username });
  }

  setComplete(id): Observable<any> {
    return this._http.get(`${baseUrl}/users/setUserComplete.php?id=${id}`);
  }

  confirmSupplier(id): Observable<any> {
    return this._http.get(`${baseUrl}/users/confirmSupplier.php?id=${id}`);
  }
}
