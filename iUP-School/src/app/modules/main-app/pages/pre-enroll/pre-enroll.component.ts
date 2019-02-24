import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { OptionsService, PupilsService } from '@shared/services';

import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';

@Component({
  selector: 'app-pre-enroll',
  templateUrl: './pre-enroll.component.html',
  styleUrls: ['./pre-enroll.component.scss']
})
export class PreEnrollComponent implements OnInit {
  parentForm: FormGroup;
  pageTitle;

  levelList: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _options: OptionsService,
    private _pupil: PupilsService,
    private _toastr: ToastrService
  ) {
    this.parentForm = fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      mname: ['', [Validators.required]],
      gender: ['Male', [Validators.required]],
      birthdate: ['', [Validators.required]],
      birthplace: ['', [Validators.required]],
      address: ['', [Validators.required]],
      level: ['', [Validators.required]]
    });
    this.pageTitle = this.activatedRoute.snapshot.data.pageTitle;
  }

  ngOnInit() {
    this.getLevel();
  }

  getLevel() {
    this._options.getLevel().subscribe(res => {
      this.levelList = res;
    });
  }

  enroll(status) {
    if (status) {
      return;
    }

    const { usersId } = JSON.parse(localStorage.getItem('currentUser'));
    const postData = {
      ...this.parentForm.value,
      bdate: moment(this.parentForm.value.birthdate).format('YYYY-MM-DD'),
      parentId: usersId
    };
    this._pupil.preEnroll(postData).subscribe(res => {
      if (res) {
        this._toastr.success('Pupil resrve a slot!', 'Pre Enrollment');
        this.router.navigate(['/app']);
      }
    });
  }

  get controls() {
    return this.parentForm.controls;
  }
}
