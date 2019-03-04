import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UsersService,
  ParentService,
  OptionsService,
  TeacherService
} from '@shared/services';

@Component({
  selector: 'app-teacher-manage-info',
  templateUrl: './teacher-manage-info.component.html',
  styleUrls: ['./teacher-manage-info.component.scss']
})
export class TeacherManageInfoComponent implements OnInit {
  // @ViewChild('parentForm') parentForm: HTMLFormElement;
  parentForm: FormGroup;

  parentInfoId: number = 0;
  username: string;
  isUpdate: boolean = false;
  openForm: boolean = false;
  userDetails: any;

  type;
  gradeLevels: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _users: UsersService,
    private _parent: ParentService,
    private _teacher: TeacherService,
    private _option: OptionsService
  ) {
    this.parentForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      advisory: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.data.type;
    this.activatedRoute.params.subscribe(res => {
      if (res && res.username) {
        this.username = res.username;
        this.getDetails();
        this.getLevels();
      } else {
        this.router.navigate(['/app']);
      }
    });
  }

  getLevels() {
    this._option.getLevel().subscribe(res => {
      console.log('level', res);
      this.gradeLevels = res;
    });
  }

  getDetails() {
    if (this.username) {
      this._users.getTeacherInfo(this.username).subscribe(res => {
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
          this.parentForm.controls['advisory'].setValue(info.advisory);
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
      ...this.parentForm.value,
      level: this.parentForm.value.advisory
    };
    this._teacher.addInfo(postData).subscribe(res => {
      if (res) {
        this.getDetails();
      }
    });
  }

  editInfo() {
    this.openForm = !this.openForm;
    this.isUpdate = !this.isUpdate;
  }

  getAdvisory(level) {
    if (level) {
      const item = this.gradeLevels.find(i => +i.id === +level);
      return item && item.level;
    } else {
      return '';
    }
  }

  get controls() {
    return this.parentForm.controls;
  }
}
