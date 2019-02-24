import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionsService, ParentService, PupilsService } from '@shared/services';

import * as moment from 'moment';

@Component({
  selector: 'app-enroll-pupil',
  templateUrl: './enroll-pupil.component.html',
  styleUrls: ['./enroll-pupil.component.scss']
})
export class EnrollPupilComponent implements OnInit {
  public onClose: Subject<boolean>;

  pupilForm: FormGroup;
  levelList: Array<any> = [];
  parentsList: Array<any> = [];

  parentId;

  constructor(
    private fb: FormBuilder,
    private bsModalRef: BsModalRef,
    private _parent: ParentService,
    private _options: OptionsService,
    private _pupil: PupilsService
  ) {
    this.pupilForm = fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      mname: ['', [Validators.required]],
      gender: ['Male', [Validators.required]],
      birthdate: ['', [Validators.required]],
      birthplace: ['', [Validators.required]],
      address: ['', [Validators.required]],
      level: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.getParents();
    this.getLevel();
  }

  getLevel() {
    this._options.getLevel().subscribe(res => {
      this.levelList = res;
    });
  }

  getParents() {
    this._parent.getParents().subscribe(res => {
      this.parentsList = res;
      console.log('parents', res);
    });
  }

  getSelected(val) {
    this.parentId = val.id;
  }

  submit(status) {
    if (status || !this.parentId) {
      return;
    }

    const postData = {
      ...this.pupilForm.value,
      bdate: moment(this.pupilForm.value.birthdate).format('YYYY-MM-DD'),
      parentId: this.parentId
    };
    this._pupil.addPupil(postData).subscribe(res => {
      if (res) {
        this.close(true);
      }
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
  get controls() {
    return this.pupilForm.controls;
  }
}
