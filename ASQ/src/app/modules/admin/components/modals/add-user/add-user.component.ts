import { Component, OnInit, ViewChild } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';
import { UsersService } from '@shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild('userForm') userForm: HTMLFormElement;
  public onClose: Subject<boolean>;

  isEdit: boolean;
  usersId: number;
  usersInfo;
  types;
  isTypeSelected: boolean = false;

  firstName;
  lastName;
  username;
  password;

  isUserTimeout;
  isUsernameValid: boolean = false;

  constructor(public bsModalRef: BsModalRef, private _users: UsersService) {}

  ngOnInit() {
    this.onClose = new Subject();
    if (this.isEdit && this.usersId) {
      this.isTypeSelected = true;
      this.getUserInfo(this.usersId);
    }
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

  getUserInfo(id) {
    this._users.getUser(id).subscribe(res => {
      if (res && res.username) {
        this.usersInfo = res;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.username = res.username;
        this.password = res.password;
      }
    });
  }

  createUserValid() {
    return (
      !this.firstName || !this.lastName || !this.username || !this.password
    );
  }

  checkUsername(value) {
    if (this.isUserTimeout) {
      clearTimeout(this.isUserTimeout);
    }
    this.isUsernameValid = false;

    this.isUserTimeout = setTimeout(() => {
      this._users.checkUsername(value).subscribe(res => {
        this.isUsernameValid = !res;
        if (res) {
          this.userForm.form.controls['username'].setErrors({
            incorrect: true,
            invalid: true
          });
        }
      });
    }, 1000);
  }

  selectType() {
    if (!this.types) {
      return;
    }
    this.isTypeSelected = true;
  }

  saveUser() {
    if (this.createUserValid()) {
      return;
    }
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      usersType: this.types
    };
    if (!this.isEdit) {
      const postData = {
        ...data,
        usersType: this.types
      };
      this._users.createUser(postData).subscribe(res => {
        if (res) {
          this.close(true);
        }
      });
    } else {
      const updateData = {
        id: this.usersId,
        ...data
      };
      this._users.updateUser(updateData).subscribe(res => {
        if (res) {
          this.close(true);
        }
      });
    }
  }
}
