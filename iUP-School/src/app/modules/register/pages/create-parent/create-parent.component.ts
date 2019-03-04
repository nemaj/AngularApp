import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidation } from '@shared/utilities/password-validation';
import {
  UsersService,
  ParentService,
  AuthService,
  AppLoadService
} from '@shared/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-parent',
  templateUrl: './create-parent.component.html',
  styleUrls: ['./create-parent.component.scss']
})
export class CreateParentComponent implements OnInit {
  ngForm: FormGroup;

  isUserTimeout;
  isUsernameValid: boolean = false;

  type;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _load: AppLoadService,
    private _users: UsersService,
    private _parent: ParentService
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

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data);
    this.type = this.activatedRoute.snapshot.data.type;
  }

  submit(status) {
    if (status) {
      return;
    }
    const postData = {
      ...this.ngForm.value,
      role: this.type === 'Teacher' ? '3' : '4'
    };
    this._parent.createAccout(postData).subscribe(res => {
      if (res) {
        const obj = {
          username: this.ngForm.value.username,
          role: this.type === 'Teacher' ? '3' : '4',
          isLogin: true
        };

        localStorage.setItem('currentUser', JSON.stringify(obj));
        this._load.initializeApp();
        this.router.navigate([`/app/parent/${obj.username}`]);
      }
    });
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
          this.ngForm.controls['username'].setErrors({
            incorrect: true,
            invalid: true
          });
        }
      });
    }, 1000);
  }

  get controls() {
    return this.ngForm.controls;
  }
}
