import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { TeacherInfoComponent } from '../../components/modals/teacher-info/teacher-info.component';
import { TeacherVerifyComponent } from '../../components/modals/teacher-verify/teacher-verify.component';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teacherList: Array<any> = [];
  showInfo: boolean = false;
  teacherInfo;
  moreInfo;

  constructor(
    private modalService: BsModalService,
    private _teacher: TeacherService
  ) {}

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this._teacher.getAll().subscribe(res => {
      this.teacherList = res;
      console.log('teacherList', res);
    });
  }

  getInfo() {
    if (this.teacherInfo && this.teacherInfo.id) {
      this._teacher.getInfo(+this.teacherInfo.id).subscribe(res => {
        this.moreInfo = res;
      });
    }
  }

  getSelected(val) {
    this.showInfo = true;
    this.teacherInfo = val;
    this.getInfo();
  }

  addInfo(item) {
    const initialState = {
      teacher: item
    };
    const modalRef = this.modalService.show(TeacherInfoComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<TeacherInfoComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getTeachers();
      }
    });
  }

  verify(item) {
    const initialState = {
      teacher: item
    };
    const modalRef = this.modalService.show(TeacherVerifyComponent, {
      initialState
    });
    (<TeacherVerifyComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getTeachers();
      }
    });
  }

  deleteUser(item) {
    const initialState = {
      message: `Do you want to delete teacher ${item.lastName}?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._teacher.delete(item.id).subscribe(res => {
          if (res) {
            this.getTeachers();
          }
        });
      }
    });
  }
}
