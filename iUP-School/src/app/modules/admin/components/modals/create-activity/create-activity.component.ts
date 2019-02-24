import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { ActivitiesService } from '@shared/services';
import * as moment from 'moment';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {
  public onClose: Subject<boolean>;
  @ViewChild('activityForm') activityForm: HTMLFormElement;
  date;
  end;
  title;

  constructor(
    private bsModalRef: BsModalRef,
    private _activityAPI: ActivitiesService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.end = moment(this.date).format('YYYY-MM-DD');
  }

  submit(invalid) {
    if (invalid) {
      return;
    }
    const postData = {
      title: this.title,
      start: this.date,
      end: this.end
    };
    this._activityAPI.createActivity(postData).subscribe(res => {
      if (res) {
        this.close(res);
      }
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
