import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { UsersService } from '@shared/services';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit {
  public onClose: Subject<boolean>;
  userId;

  // form
  @ViewChild('userForm') userForm: HTMLFormElement;
  username;
  password;

  constructor(private bsModalRef: BsModalRef, private _users: UsersService) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getInfo();
  }

  getInfo() {
    const { usersId } = JSON.parse(localStorage.getItem('currentUser'));
    this._users.getEachUsers(usersId).subscribe(res => {
      this.userId = res.id;
      this.username = res.username;
    });
  }

  submit(status) {
    if (status) {
      return;
    }
    const postData = {
      userId: this.userId,
      username: this.username,
      password: this.password
    };
    this._users.updateUser(postData).subscribe(res => {
      this.close(res);
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
