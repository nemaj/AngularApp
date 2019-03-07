import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppLoadService, ActivitiesService } from '@shared/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor(
    private _user: AppLoadService,
    private _activity: ActivitiesService,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log(this._user.getUserInfo());
  }

  ngAfterViewInit() {
    this._activity.getNearEvent().subscribe(res => {
      if (res && +res.days <= 5) {
        this._toastr.info(
          `'${res.title}' is on ${res.formatDate}`,
          'Upcoming Event',
          {
            timeOut: 10000
          }
        );
      }
    });
  }
}
