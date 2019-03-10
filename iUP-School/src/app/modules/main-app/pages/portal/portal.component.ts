import { Component, OnInit } from '@angular/core';
import {
  MaterialsService,
  SchedulesService,
  OptionsService,
  CashierService,
  GradingService,
  ParentService
} from '@shared/services';

import * as moment from 'moment';
import { RequestOptions, ResponseContentType, Http } from '@angular/http';
import { FileSaverService } from 'ngx-filesaver';

import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  isDoneSearch: boolean = false;
  searchTimeout;
  searchInput;
  searchResult: Array<any> = [];
  selectedPupil;
  selectedPupilId: number = 0;
  pupilGrades: Array<any> = [];
  pupilList: Array<any> = [];

  classLevel = '';

  levelList: Array<any> = [];

  materials: Array<any> = [];
  classSchedules: Array<any> = [];
  parentId;

  constructor(
    private http: Http,
    private router: Router,
    private _FileSaverService: FileSaverService,
    private _material: MaterialsService,
    private _schedule: SchedulesService,
    private _options: OptionsService,
    private _cashier: CashierService,
    private _parent: ParentService,
    private _grading: GradingService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.parentId = currentUser.usersId;
    this.getParentPupils();
    this.getLevel();
    this.getMaterials();
  }

  find(value) {
    this.isDoneSearch = false;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.isDoneSearch = true;
      this._cashier.findByPupil(value, this.parentId).subscribe(res => {
        this.searchResult = res;
      });
    }, 1000);
  }

  getParentPupils() {
    this._parent.getPupils(this.parentId).subscribe(res => {
      this.pupilList = res;
      console.log('list', res);
    });
  }

  selectPupil(item) {
    console.log('item', item);
    this.selectedPupilId = item.id;
    this.selectedPupil = item;
    this.searchInput = `${item.lastName}, ${item.firstName} ${item.middleName}`;
    this.isDoneSearch = false;
    this.getPupilGrades();
  }

  gotoPupilDetails() {
    if (this.selectedPupilId) {
      this.router.navigate([`/app/pre-enroll/${this.selectedPupilId}`]);
    }
  }

  getPupilGrades() {
    if (this.selectedPupilId) {
      this._grading.getPupilGrades(this.selectedPupilId).subscribe(res => {
        console.log('grades', res);
        this.pupilGrades = res;
      });
    }
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

  getMaterials() {
    this._material.getMaterials().subscribe(res => {
      this.materials = res;
    });
  }

  download(item) {
    const materialPath = `${environment.filePath}${item.file}`;
    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });

    this.http.get(materialPath, options).subscribe(res => {
      this._FileSaverService.save((<any>res)._body, item.name);
    });
  }

  getLevel() {
    this._options.getLevel().subscribe(res => {
      this.levelList = res;
    });
  }
}
