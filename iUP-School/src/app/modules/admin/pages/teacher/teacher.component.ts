import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { TeacherInfoComponent } from '../../components/modals/teacher-info/teacher-info.component';

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

  addInfo() {
    const initialState = {
      teacher: this.teacherInfo
    };
    const modalRef = this.modalService.show(TeacherInfoComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<TeacherInfoComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getInfo();
      }
    });
  }
}
