import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@shared/services';
import { Router } from '@angular/router';

import { ROLES } from '@shared/constants/user-roles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: HTMLFormElement;
  username;
  password;

  isInvalid: boolean = false;

  constructor(private router: Router, private _auth: AuthService) {}

  ngOnInit() {}

  submit(invalid: boolean) {
    if (invalid) {
      return;
    }
    this.isInvalid = false;

    this._auth.login(this.username, this.password).subscribe(res => {
      if (res) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (+currentUser.role === ROLES.ADMIN) {
          this.router.navigate(['/admin']);
        } else if (+currentUser.role === ROLES.CASHIER) {
          this.router.navigate(['/cashier']);
        } else if (
          +currentUser.role === ROLES.PARENT &&
          !currentUser.infoExist
        ) {
          this.router.navigate([`/app/parent/${currentUser.username}`]);
        } else {
          if (currentUser.verify) {
            this.router.navigate(['/app']);
          } else {
            this.router.navigate(['/create/not-verified']);
          }
        }
      } else {
        this.isInvalid = true;
      }
    });
  }
}
