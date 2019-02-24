import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '@shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: HTMLFormElement;
  username;
  password;
  returnUrl;

  constructor(private activRoute: ActivatedRoute, private _auth: AuthService) {}

  ngOnInit() {
    this.returnUrl = this.activRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(status) {
    if (status) {
      return;
    }
    this._auth.login(this.username, this.password).subscribe(res => {
      if (res && res.role) {
        this._auth.redirectByRole(+res.role, +res.isComplete);
      } else {
        this.loginForm.form.controls['password'].setErrors({
          incorrect: true,
          invalid: true
        });
      }
    });
  }
}
