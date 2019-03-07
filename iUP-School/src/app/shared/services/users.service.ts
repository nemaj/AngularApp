import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
const baseUrl = `${environment.baseUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<any> {
    return this._http.get(`${baseUrl}/getUsers.php`);
  }

  getEachUsers(id): Observable<any> {
    return this._http.get(`${baseUrl}/getEachUsers.php?id=${id}`);
  }

  getUsersInfo(username): Observable<any> {
    return this._http.get(`${baseUrl}/getUsersInfo.php?username=${username}`);
  }

  getTeacherInfo(username): Observable<any> {
    return this._http.get(`${baseUrl}/getTeacherInfo.php?username=${username}`);
  }

  addUser(data, id: number = 0): Observable<any> {
    return this._http.post(`${baseUrl}/addUser.php?id=${id}`, data);
  }

  checkUsername(username): Observable<any> {
    return this._http.get(`${baseUrl}/checkUsername.php?username=${username}`);
  }

  deleteUser(id): Observable<any> {
    return this._http.get(`${baseUrl}/removeUser.php?id=${id}`);
  }

  updateUser(data): Observable<any> {
    return this._http.post(`${baseUrl}/updateUser.php`, data);
  }
}
