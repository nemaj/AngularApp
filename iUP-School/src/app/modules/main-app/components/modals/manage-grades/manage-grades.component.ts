import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';
import { GradingService } from '@shared/services';

@Component({
  selector: 'app-manage-grades',
  templateUrl: './manage-grades.component.html',
  styleUrls: ['./manage-grades.component.scss']
})
export class ManageGradesComponent implements OnInit {
  public onClose: Subject<boolean>;

  // params
  pupilInfo;
  levelId;
  subjectId;
  period;
  gradingId;

  periodDesc = '';
  details: Array<any>;

  // forms
  finalTest;
  unitTest;
  quizzes;
  assignment;
  project;
  participation;

  gradeAVG;

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private _grading: GradingService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getPeriod();
    this.getDetails();
  }

  getDetails() {
    if (this.gradingId) {
      this._grading.getGradeDetails(this.gradingId).subscribe(res => {
        this.details = res;
        this.getAVG();
      });
    }
  }

  getAVG() {
    this._grading.updateGrades(this.gradingId).subscribe(res => {
      this.gradeAVG = res || 0;
    });
  }

  saveGrades() {
    const initialState = {
      message: `Are you sure do you want save this?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        const postData = {
          details: this.details,
          gradingId: this.gradingId
        };
        this._grading.saveDetails(postData).subscribe(res => {
          if (res) {
            this.close(true);
          }
        });
      }
    });
  }

  getPeriod() {
    if (this.period === '1') {
      this.periodDesc = '1st Period';
    } else if (this.period === '2') {
      this.periodDesc = '2nd Period';
    } else if (this.period === '3') {
      this.periodDesc = '3rd Period';
    } else if (this.period === '4') {
      this.periodDesc = '4th Period';
    }
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
