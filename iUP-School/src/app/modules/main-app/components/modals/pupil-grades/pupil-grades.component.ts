import { Component, OnInit } from '@angular/core';
import { UtilityService, GradingService } from '@shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { ManageGradesComponent } from '../manage-grades/manage-grades.component';

@Component({
  selector: 'app-pupil-grades',
  templateUrl: './pupil-grades.component.html',
  styleUrls: ['./pupil-grades.component.scss']
})
export class PupilGradesComponent implements OnInit {
  public onClose: Subject<boolean>;
  pupilInfo;
  levelId;

  subjectsList: Array<any> = [];
  period = '';

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private _utility: UtilityService,
    private _grading: GradingService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
  }

  getSubjects() {
    if (this.levelId && this.period) {
      const postData = {
        pupilId: this.pupilInfo.pupilId,
        level: this.levelId,
        period: this.period
      };
      this._grading.getSubjects(postData).subscribe(res => {
        this.subjectsList = res;
      });
      // this._utility.getSubjectsByLevel(this.levelId).subscribe(res => {
      //   console.log('subjects', res);
      //   this.subjectsList = res;
      // });
    }
  }

  manage(item) {
    const initialState = {
      pupilInfo: this.pupilInfo,
      levelId: this.levelId,
      subjectId: item.id,
      period: this.period,
      gradingId: item.gradingId
    };
    const modalRef = this.modalService.show(ManageGradesComponent, {
      initialState,
      animated: false,
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'modal-lg manage-modal'
    });
    (<ManageGradesComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._grading.updateGrades(item.gradingId).subscribe(res => {
          if (res) {
            this.getSubjects();
          }
        });
      }
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
