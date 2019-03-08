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
  pupilId;
  isUpdating: boolean = false;

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
    this.isUpdating = false;
    this.getLevel();
    this.pupilId =
      (this.activatedRoute.snapshot.params &&
        this.activatedRoute.snapshot.params.id) ||
      '';
    if (this.pupilId) {
      this.getDetails();
    }
  }

  getDetails() {
    this._pupil.getInfo(this.pupilId).subscribe(res => {
      this.isUpdating = true;
      this.parentForm.controls.fname.setValue(res.firstName);
      this.parentForm.controls.lname.setValue(res.lastName);
      this.parentForm.controls.mname.setValue(res.middleName);
      this.parentForm.controls.gender.setValue(res.gender);
      this.parentForm.controls.birthdate.setValue(res.birthdate);
      this.parentForm.controls.birthplace.setValue(res.birthplace);
      this.parentForm.controls.address.setValue(res.address);
      this.parentForm.controls.level.setValue(res.levelId);
    });
  }

  updatePupil() {
    const postData = {
      ...this.parentForm.value,
      bdate: moment(this.parentForm.value.birthdate).format('YYYY-MM-DD'),
      pupilId: this.pupilId
    };
    console.log(postData);
    // this._pupil.updateInfo(postData).subscribe(res => {
    //   if (res) {
    //     this._toastr.success(
    //       'Pupil update details successfully!',
    //       'Pupil Information'
    //     );
    //     this.router.navigate(['/app']);
    //   }
    // });
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

    if (this.pupilId) {
      this.updatePupil();
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

  setButtonLabel() {
    if (this.pageTitle === 'Pre Enrollment' && !this.pupilId) {
      return 'Enroll';
    } else if (this.pupilId) {
      return 'Update';
    } else {
      return 'Save';
    }
  }

  get controls() {
    return this.parentForm.controls;
  }
}
