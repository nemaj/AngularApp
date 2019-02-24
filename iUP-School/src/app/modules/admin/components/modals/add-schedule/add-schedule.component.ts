import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { SchedulesService, UtilityService } from '@shared/services';
import * as moment from 'moment';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {
  public onClose: Subject<boolean>;
  classLevel;
  learningAreas;

  // form
  startTime;
  endTime;
  day = '';
  areas = '';

  constructor(
    private bsModalRef: BsModalRef,
    private _utility: UtilityService,
    private _schedule: SchedulesService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getAreas();
    console.log('classLevel', this.classLevel);
  }

  getAreas() {
    this._utility.getAreas().subscribe(res => {
      console.log('res', res);
      this.learningAreas = res;
    });
  }

  submit() {
    if (!this.startTime || !this.endTime || !this.areas || !this.day) {
      return;
    }
    const postData = {
      level: this.classLevel,
      startTime: moment(this.startTime).format('HH:mm:ss'),
      endTime: moment(this.endTime).format('HH:mm:ss'),
      areas: this.areas,
      day: this.day
    };
    this._schedule.createSchedule(postData).subscribe(res => {
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
