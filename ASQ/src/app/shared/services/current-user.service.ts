import { Injectable } from '@angular/core';

import { ROLES } from '@shared/constants/users';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  currentUser: any;

  constructor() {}

  setUserInfo() {
    const currentUser = localStorage.getItem('currentUser');
    const currentInfo = {
      isLogin: currentUser ? true : false,
      isAdmin: false,
      isSupplier: false,
      isCustomer: false,
      info: {}
    };
    if (currentInfo.isLogin) {
      const info = JSON.parse(currentUser);
      currentInfo.isAdmin = info && +info.role === ROLES.ADMIN;
      currentInfo.isSupplier = info && +info.role === ROLES.SUPPLIER;
      currentInfo.isCustomer = info && +info.role === ROLES.CUSTOMER;
      currentInfo.info = info;
    }
    this.currentUser = currentInfo;
  }

  getUserInfo() {
    this.setUserInfo();
    return this.currentUser;
  }
}
