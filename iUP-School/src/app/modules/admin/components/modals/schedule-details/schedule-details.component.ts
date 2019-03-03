import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SchedulesService, UtilityService } from '@shared/services';

import * as moment from 'moment';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent implements OnInit {
  public onClose: Subject<boolean>;
  scheduleId;
  scheduleInfo;
  scheduleStart;
  scheduleEnd;
  duration;

  edit: boolean = false;
  learningAreas: Array<any> = [];

  // Forms
  startTime;
  endTime;
  day = '';
  areas = '';

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private _utility: UtilityService,
    private _schedule: SchedulesService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getDetails();
    this.getAreas();
  }

  getAreas() {
    this._utility.getAreas().subscribe(res => {
      this.learningAreas = res;
    });
  }

  getDetails() {
    if (this.scheduleId) {
      this._schedule.getDetails(this.scheduleId).subscribe(res => {
        this.edit = false;
        this.scheduleInfo = res;
        this.scheduleStart = moment(res.startTime, 'DD/MM/YYYY HH:mm:ss');
        this.scheduleEnd = moment(res.endTime, 'DD/MM/YYYY HH:mm:ss');
        this.duration = moment
          .duration(this.scheduleEnd.diff(this.scheduleStart))
          .asMinutes();

        this.startTime = new Date(this.scheduleStart);
        this.endTime = new Date(this.scheduleEnd);
        this.day = res.day;
        this.areas = res.areas;
      });
    }
  }

  update() {
    const postData = {
      level: this.scheduleInfo.levelId,
      startTime: moment(this.startTime).format('HH:mm:ss'),
      endTime: moment(this.endTime).format('HH:mm:ss'),
      areas: this.areas,
      day: this.day
    };
    this._schedule.createSchedule(postData, this.scheduleId).subscribe(res => {
      if (res) {
        this.getDetails();
      }
    });
  }

  delete() {
    const initialState = {
      message: `Do you want to delete this schedule?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._schedule.deleteSchedule(this.scheduleId).subscribe(res => {
          if (res) {
            this.close();
          }
        });
      }
    });
  }

  close() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
}
