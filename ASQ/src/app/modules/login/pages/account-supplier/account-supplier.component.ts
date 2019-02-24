import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UsersService } from '@shared/services';
import { PasswordValidation } from '@shared/utilities/password-match';

@Component({
  selector: 'app-account-supplier',
  templateUrl: './account-supplier.component.html',
  styleUrls: ['./account-supplier.component.scss']
})
export class AccountSupplierComponent implements OnInit {
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
      password
    };
    this._userApi.createSupplier(postData).subscribe(res => {
      if (!res) {
        this.ngForm.controls['username'].setErrors({
          incorrect: true,
          invalid: true
        });
      } else {
        this._auth.registered({ usersId: res, username, role: 2 });
      }
    });
  }

  getFormControl(name) {
    return this.ngForm.controls[name];
  }
}
