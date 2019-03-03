import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { UsersService } from '@shared/services';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  public onClose: Subject<boolean>;
  info;
  password;
  username;

  isUserTimeout;
  isUsernameChange: boolean = false;
  usernameChange: boolean = false;
  isUsernameValid: boolean = false;

  constructor(public bsModalRef: BsModalRef, private _users: UsersService) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getInfo();
  }

  getInfo() {
    const { usersId } = JSON.parse(localStorage.getItem('currentUser'));
    this._users.getUserInfo(usersId).subscribe(res => {
      this.info = res;
    });
  }

  submit(status) {
    if (status || !this.isUsernameValid) {
      return;
    }
    const postData = {
      id: this.info.id,
      firstName: this.info.firstName,
      lastName: this.info.lastName,
      username: this.username,
      password: this.password
    };
    this._users.updateUser(postData).subscribe(res => {
      if (res) {
        this.close(true);
      }
    });
  }

  checkUsername(value) {
    if (this.info.username === value) {
      return;
    }
    if (this.isUserTimeout) {
      clearTimeout(this.isUserTimeout);
    }
    this.isUsernameValid = false;
    this.usernameChange = true;

    this.isUserTimeout = setTimeout(() => {
      this._users.checkUsername(value).subscribe(res => {
        this.usernameChange = false;
        this.isUsernameValid = !res;
      });
    }, 1000);
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
