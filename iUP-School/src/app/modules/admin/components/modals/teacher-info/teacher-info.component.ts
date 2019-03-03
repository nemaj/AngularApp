import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { OptionsService, TeacherService } from '@shared/services';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.scss']
})
export class TeacherInfoComponent implements OnInit {
  myForm: FormGroup;
  public onClose: Subject<boolean>;
  isEdit: boolean = false;

  teacher;
  levelList: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private bsModalRef: BsModalRef,
    private _options: OptionsService,
    private _teacher: TeacherService
  ) {
    this.myForm = fb.group({
      gender: ['Male', [Validators.required]],
      level: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.getLevel();
    this.getInfo();
  }

  getLevel() {
    this._options.getLevel().subscribe(res => {
      this.levelList = res;
    });
  }

  getInfo() {
    if (this.teacher && this.teacher.id) {
      this._teacher.getInfo(+this.teacher.id).subscribe(res => {
        if (res && res.isHasInfo) {
          const { address, contact, email, gender, level } = res;
          this.controls['gender'].setValue(gender);
          this.controls['address'].setValue(address);
          this.controls['contact'].setValue(contact);
          this.controls['email'].setValue(email);
          this.controls['level'].setValue(level);
        }
      });
    }
  }

  submit(status) {
    if (status) {
      return;
    }

    const postData = {
      ...this.myForm.value,
      usersId: +this.teacher.id
    };
    this._teacher.addInfo(postData).subscribe(res => {
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
    return this.myForm.controls;
  }
}
