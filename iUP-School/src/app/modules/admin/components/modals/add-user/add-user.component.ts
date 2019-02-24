import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { UsersService } from '@shared/services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild('userForm') userForm: HTMLFormElement;

  usersId: number = 0;
  isEdit: boolean = false;
  usersInfo;
  typeDesc: string;

  // form value
  userType = '4';
  firstName;
  lastName;
  username;
  password;

  isUserTimeout;
  isUsernameValid: boolean = false;

  public onClose: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef, private _users: UsersService) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.isEdit = !!this.usersId;
    this.getDetails(+this.usersId);
  }

  getDetails(id: number) {
    if (id) {
      this._users.getEachUsers(id).subscribe(res => {
        this.usersInfo = res;
        this.typeDesc = this.getRoleDesc(res.role);
        this.userType = res.role;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.username = res.username;
      });
    }
  }

  getRoleDesc(type) {
    switch (type) {
      case '1':
        return 'Administrator';
      case '2':
        return 'Cashier';
      case '3':
        return 'Teacher';
      case '4':
        return 'Parent';
      default:
        return '';
    }
  }

  submit(invalid: boolean) {
    if (invalid) {
      return;
    }

    const postData = {
      userType: this.userType,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password
    };
    this._users.addUser(postData, this.usersId).subscribe(res => {
      if (res) {
        this.close(true);
      }
    });
  }

  selectType(evt) {
    const value = evt.target.value;
    this.userType = value;
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

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
