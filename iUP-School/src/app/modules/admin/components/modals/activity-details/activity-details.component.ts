import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivitiesService } from '@shared/services';

import * as moment from 'moment';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  public onClose: Subject<boolean>;
  event;

  isEdit: boolean = false;
  date;
  title;
  end;

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private _activityAPI: ActivitiesService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.date = this.event.start;
    this.title = this.event.title;
    const endDate = this.event.end ? this.event.end : this.event.start;
    this.end = moment(endDate).format('YYYY-MM-DD');
  }

  submit() {
    if (!this.title) {
      return;
    }
    this._activityAPI
      .createActivity(
        { title: this.title, start: this.date, end: this.end },
        this.event.id
      )
      .subscribe(res => {
        if (res) {
          this.close();
        }
      });
  }

  delete() {
    this._activityAPI.deleteActivity(this.event.id).subscribe(res => {
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
