import { Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  constructor(private _currentUser: CurrentUserService) {}

  initializeApp() {
    this._currentUser.setUserInfo();
    return true;
  }
}
