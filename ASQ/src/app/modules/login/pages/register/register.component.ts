import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidation } from '@shared/utilities/password-match';
import { UsersService, AuthService } from '@shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  ngForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _userApi: UsersService
  ) {
    this.ngForm = fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirm: ['', [Validators.required]]
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
  }

  ngOnInit() {}

  register(invalid) {
    if (invalid) {
      return;
    }

    const { firstName, lastName, username, password } = this.ngForm.value;

    const postData = {
      firstName,
      lastName,
      username,
      password,
      usersType: 3
    };
    this._userApi.createUser(postData).subscribe(res => {
      if (!res) {
        this.ngForm.controls['username'].setErrors({
          incorrect: true,
          invalid: true
        });
      } else {
        this._auth.registered({ usersId: res, username, role: 3 });
      }
    });
  }

  getFormControl(name) {
    return this.ngForm.controls[name];
  }
}
