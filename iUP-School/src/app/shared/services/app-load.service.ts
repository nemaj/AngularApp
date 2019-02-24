import { Injectable } from '@angular/core';
import { ROLES } from '@shared/constants/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  private userInfo = null;

  constructor() {}

  public getUserInfo() {
    return this.userInfo;
  }

  initializeApp() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      const obj = {
        isLogin: false
      };
      this.userInfo = obj;
      localStorage.setItem('currentUser', JSON.stringify(obj));
    } else {
      const obj = {
        ...user,
        status: {
          isAdmin: +user.role === ROLES.ADMIN,
          isParent: +user.role === ROLES.PARENT,
          isCashier: +user.role === ROLES.CASHIER,
          isTeacher: +user.role === ROLES.TEACHER
        }
      };
      this.userInfo = obj;
    }
    return true;
  }
}
