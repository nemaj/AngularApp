import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { UtilityService, OptionsService } from '@shared/services';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  public onClose: Subject<boolean>;

  levelList: Array<any> = [];

  // params
  isEdit: boolean;
  item;

  // forms
  @ViewChild('subjectForm') subjectForm: HTMLFormElement;
  subject;
  level = '';
  subjectId: number = 0;

  constructor(
    private bsModalRef: BsModalRef,
    private _option: OptionsService,
    private _utility: UtilityService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getLevel();
    console.log('isEdit', this.isEdit);
    if (this.isEdit) {
      this.subject = this.item.subject;
      this.level = this.item.levelId;
      this.subjectId = this.item.id;
    }
  }

  getLevel() {
    this._option.getLevel().subscribe(res => {
      console.log('level', res);
      this.levelList = res;
    });
  }

  submit(status) {
    if (status) {
      return;
    }

    this._utility
      .addSubject({ subject: this.subject, level: this.level }, this.subjectId)
      .subscribe(res => {
        if (res) {
          this.close(true);
        }
      });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
