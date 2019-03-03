import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { TeacherService } from '@shared/services';

@Component({
  selector: 'app-teacher-verify',
  templateUrl: './teacher-verify.component.html',
  styleUrls: ['./teacher-verify.component.scss']
})
export class TeacherVerifyComponent implements OnInit {
  public onClose: Subject<boolean>;
  teacher;
  status: boolean = false;

  constructor(
    private bsModalRef: BsModalRef,
    private _teacher: TeacherService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getStatus(this.teacher.id);
  }

  getStatus(id) {
    if (id) {
      this._teacher.getStatus(id).subscribe(res => {
        this.status = !!res;
        console.log('status', this.status);
      });
    } else {
      this.close();
    }
  }

  verify() {
    this._teacher.verify(this.teacher.id).subscribe(res => {
      this.status = true;
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
