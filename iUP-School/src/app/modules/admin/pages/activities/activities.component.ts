import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { BsModalService } from 'ngx-bootstrap';
import { ActivityDetailsComponent } from '../../components/modals/activity-details/activity-details.component';
import { CreateActivityComponent } from '../../components/modals/create-activity/create-activity.component';
import { ActivitiesService } from '@shared/services';
import * as moment from 'moment';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  selectedDate;

  data = [
    {
      id: 1,
      start: '2019-1-01',
      title: 'All Day Event',
      description: 'Sample Description'
    },
    {
      id: 2,
      start: '2019-1-09',
      title: 'Repeating Event'
    },
    {
      id: 3,
      end: '2019-1-10',
      start: '2019-1-07',
      title: 'Long Event'
    }
  ];

  constructor(
    private modalService: BsModalService,
    private _activityAPI: ActivitiesService
  ) {}

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this._activityAPI.getActivities().subscribe(res => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next',
          center: 'title',
          // right: 'month,agendaWeek,agendaDay,listMonth'
          right: 'today month,agendaWeek'
        },
        events: res
      };
    });
  }

  selectEvent(evt) {
    const initialState = {
      date: evt.date
    };
    const modalRef = this.modalService.show(CreateActivityComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<CreateActivityComponent>modalRef.content).onClose.subscribe(result => {
      if (result) {
        this._activityAPI.getEachActivity(result).subscribe(res => {
          this.ucCalendar.fullCalendar('renderEvent', res);
        });
      }
    });
  }

  viewEvent(item) {
    const event = {
      id: item.event.id,
      start: item.event.start,
      end: item.event.end,
      title: item.event.title,
      allDay: item.event.allDay
    };
    const initialState = { event };
    const modalRef = this.modalService.show(ActivityDetailsComponent, {
      initialState
    });
    (<ActivityDetailsComponent>modalRef.content).onClose.subscribe(result => {
      if (!result) {
        this._activityAPI.getEachActivity(item.event.id).subscribe(res => {
          this.ucCalendar.fullCalendar('removeEvents', [item.event.id]);
          this.ucCalendar.fullCalendar('renderEvent', res);
        });
      } else {
        this.ucCalendar.fullCalendar('removeEvents', [item.event.id]);
      }
    });
  }
}
