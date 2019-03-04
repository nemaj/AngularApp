import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { AppLoadService } from './app-load.service';
import { ROLES } from '@shared/constants/user-roles';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private _http: HttpClient,
    private _load: AppLoadService
  ) {}

  login(username: string, password: string) {
    return this._http
      .post<any>(`${baseUrl}/users/login.php`, {
        username,
        password
      })
      .pipe(
        map(user => {
          if (user && user.username) {
            const obj = {
              usersId: user.usersId,
              username: user.username,
              role: user.role,
              infoExist: user.infoExist,
              isLogin: true,
              verify: user.verify
            };

            localStorage.setItem('currentUser', JSON.stringify(obj));
            this._load.initializeApp();
            return true;
          }

          return false;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    location.reload();
  }
}
