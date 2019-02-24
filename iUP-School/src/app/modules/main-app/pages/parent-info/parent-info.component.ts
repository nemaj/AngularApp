import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, ParentService } from '@shared/services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parent-info',
  templateUrl: './parent-info.component.html',
  styleUrls: ['./parent-info.component.scss']
})
export class ParentInfoComponent implements OnInit {
  // @ViewChild('parentForm') parentForm: HTMLFormElement;
  parentForm: FormGroup;

  parentInfoId: number = 0;
  username: string;
  isUpdate: boolean = false;
  openForm: boolean = false;
  userDetails: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _users: UsersService,
    private _parent: ParentService
  ) {
    this.parentForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      if (res && res.username) {
        this.username = res.username;
        this.getDetails();
      } else {
        this.router.navigate(['/app']);
      }
    });
  }

  getDetails() {
    if (this.username) {
      this._users.getUsersInfo(this.username).subscribe(res => {
        this.openForm = !res.isInfoExist;
        this.userDetails = res;
        console.log('info', res);
        if (res.isInfoExist) {
          const { info } = res;
          this.parentInfoId = +info.id;
          this.parentForm.controls['email'].setValue(info.email);
          this.parentForm.controls['gender'].setValue(info.gender);
          this.parentForm.controls['address'].setValue(info.address);
          this.parentForm.controls['contact'].setValue(info.contact);
        }
        this.isUpdate = false;
      });
    }
  }

  saveInfo(status) {
    if (status) {
      return;
    }
    const postData = {
      usersId: this.userDetails.id,
      ...this.parentForm.value
    };
    this._parent.addInfo(postData, this.parentInfoId).subscribe(res => {
      if (res) {
        this.getDetails();
      }
    });
  }

  editInfo() {
    this.openForm = !this.openForm;
    this.isUpdate = !this.isUpdate;
  }

  get controls() {
    return this.parentForm.controls;
  }
}
