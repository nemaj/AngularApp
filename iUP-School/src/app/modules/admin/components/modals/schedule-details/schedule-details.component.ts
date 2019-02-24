import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { SchedulesService } from '@shared/services';

import * as moment from 'moment';

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

  constructor(
    private bsModalRef: BsModalRef,
    private _schedule: SchedulesService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getDetails();
  }

  getDetails() {
    if (this.scheduleId) {
      this._schedule.getDetails(this.scheduleId).subscribe(res => {
        this.scheduleInfo = res;
        this.scheduleStart = moment(res.startTime, 'DD/MM/YYYY HH:mm:ss');
        this.scheduleEnd = moment(res.endTime, 'DD/MM/YYYY HH:mm:ss');
        this.duration = moment
          .duration(this.scheduleEnd.diff(this.scheduleStart))
          .asMinutes();
      });
    }
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
