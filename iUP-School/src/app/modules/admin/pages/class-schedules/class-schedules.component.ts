import { Component, OnInit } from '@angular/core';
import { OptionsService, SchedulesService } from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { AddScheduleComponent } from '../../components/modals/add-schedule/add-schedule.component';
import { ScheduleDetailsComponent } from '../../components/modals/schedule-details/schedule-details.component';

import * as moment from 'moment';

@Component({
  selector: 'app-class-schedules',
  templateUrl: './class-schedules.component.html',
  styleUrls: ['./class-schedules.component.scss']
})
export class ClassSchedulesComponent implements OnInit {
  levelList: Array<any> = [];
  classSchedules: Array<any> = [];
  classLevel = '';

  constructor(
    private modalService: BsModalService,
    private _options: OptionsService,
    private _schedule: SchedulesService
  ) {}

  ngOnInit() {
    this.getLevel();
  }

  getLevel() {
    this._options.getLevel().subscribe(res => {
      this.levelList = res;
    });
  }

  getSchedules() {
    if (this.classLevel) {
      this._schedule.getSchedulePerClass(this.classLevel).subscribe(res => {
        const newData = res.map(o => {
          o.schedules.map(i => {
            i.start = moment(i.startTime, 'DD/MM/YYYY HH:mm:ss');
            i.end = moment(i.endTime, 'DD/MM/YYYY HH:mm:ss');
            i.duration = moment.duration(i.end.diff(i.start)).asMinutes();
            return i;
          });
          return o;
        });
        this.classSchedules = newData;
      });
    }
  }

  addSchedule() {
    const initialState = {
      classLevel: this.classLevel
    };
    const modalRef = this.modalService.show(AddScheduleComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddScheduleComponent>modalRef.content).onClose.subscribe(result => {
      if (result) {
        this.getSchedules();
      }
    });
  }

  viewDetails(id: number) {
    const initialState = {
      scheduleId: id
    };
    const modalRef = this.modalService.show(ScheduleDetailsComponent, {
      initialState
    });
    (<ScheduleDetailsComponent>modalRef.content).onClose.subscribe(result => {
      if (result) {
        this.getSchedules();
      }
    });
  }
}
