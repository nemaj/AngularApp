import { Component, OnInit } from '@angular/core';
import {
  OptionsService,
  GradingService,
  TeacherService
} from '@shared/services';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap';
import { PupilGradesComponent } from '../../components/modals';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.scss']
})
export class GradingComponent implements OnInit {
  levelList: Array<any> = [];
  pupilsList: Array<any> = [];

  // forms
  level = '';
  period = '';

  teacherId: number = 0;

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private _teacher: TeacherService,
    private _options: OptionsService,
    private _grading: GradingService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.teacherId = currentUser.usersId;
    this.getInfo();
  }

  getInfo() {
    if (this.teacherId) {
      this._teacher.getInfo(this.teacherId).subscribe(res => {
        this.level = res.level;
        this.getLevel();
        this.getPupils();
      });
    }
  }

  getLevel() {
    this._options.getLevel().subscribe(res => {
      this.levelList = res.filter(i => +i.id === +this.level);
    });
  }

  getPupils() {
    if (!this.level) {
      // this.toastr.warning('Please fill all forms!');
      return;
    }
    this._grading.getPupils(this.level).subscribe(res => {
      console.log('list', res);
      this.pupilsList = res;
    });
  }

  showDetails(item: any) {
    const initialState = {
      pupilInfo: item,
      levelId: this.level
    };
    const modalRef = this.modalService.show(PupilGradesComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    // (<PupilGradesComponent>modalRef.content).onClose.subscribe(result => {
    //   if (result === true) {

    //   }
    // });
  }
}
