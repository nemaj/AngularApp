import { Component, OnInit } from '@angular/core';
import { CurrentUserService, UsersService } from '@shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  usersId;
  usersInfo;

  constructor(
    private router: Router,
    private _currentUser: CurrentUserService,
    private _users: UsersService
  ) {}

  ngOnInit() {
    const { isCustomer, info } = this._currentUser.getUserInfo();
    if (!isCustomer) {
      this.router.navigate(['/']);
      return;
    }
    this.usersId = +info.usersId;
    this.getInfo();
  }

  getInfo() {
    this._users.getCompleteInfo(this.usersId).subscribe(res => {
      this.usersInfo = res;
    });
  }

  editProfile() {
    this.router.navigate([`/customer-info`], {
      queryParams: {
        returnUrl: this.router.url.toString()
      }
    });
  }
}
