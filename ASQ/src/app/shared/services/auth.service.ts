import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '@env/environment';

import { ROLES } from '@shared/constants/users';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  url: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  registered(user) {
    if (user && user.usersId) {
      const obj = {
        usersId: user.usersId,
        username: user.username,
        role: user.role
      };
      const others = +user.role === 2 ? 2 : 0;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(obj));
      this.redirectByRole(+user.role, others);
    }
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${baseUrl}/users/login.php`, {
        username,
        password
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.usersId) {
            const obj = {
              usersId: user.usersId,
              otherId: user.otherId || 0,
              username: user.username,
              role: user.role,
              isComplete: user.isComplete
            };
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(obj));
            return user;
          }

          return false;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('productForm');
    localStorage.removeItem('browseData');
  }

  redirectByRole(role: number, isComplete: number = 0, returnUrl = '') {
    if (isComplete === 2) {
      this.url = '/login/warning';
    } else {
      switch (role) {
        case ROLES.ADMIN:
          this.url = '/admin';
          break;
        case ROLES.SUPPLIER:
          this.url = isComplete ? '/business' : '/business-info';
          break;
        case ROLES.CUSTOMER:
          this.url = isComplete ? '/' : '/customer-info';
          break;
        default:
      }
    }
    this.router.navigate([returnUrl || this.url]);
  }
}
