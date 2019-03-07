import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '@shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  pageTitle;
  eventDetail;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _activity: ActivitiesService
  ) {
    this.pageTitle = this.activatedRoute.snapshot.data.pageTitle;
  }

  ngOnInit() {
    this.getNearEvent();
  }

  getNearEvent() {
    this._activity.getNearEvent().subscribe(res => {
      if (res && res.id) {
        this.eventDetail = res;
      }
    });
  }
}
