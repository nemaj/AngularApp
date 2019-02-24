import { Component, OnInit } from '@angular/core';
import { PupilsService } from '@shared/services';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';
import { BsModalService } from 'ngx-bootstrap';
import { EnrollPupilComponent } from '../../components/modals/enroll-pupil/enroll-pupil.component';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  preEnrollList: Array<any> = [];
  enrolledList: Array<any> = [];

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private _pupil: PupilsService
  ) {}

  ngOnInit() {
    this.getEnrolled();
    this.getPreEnroll();
  }

  getEnrolled() {
    this._pupil.getEnrolled().subscribe(res => {
      this.enrolledList = res;
    });
  }

  getPreEnroll() {
    this._pupil.getPreEnroll().subscribe(res => {
      this.preEnrollList = res;
    });
  }

  addPupil() {
    const initialState = {};
    const modalRef = this.modalService.show(EnrollPupilComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<EnrollPupilComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getEnrolled();
      }
    });
  }

  enrolled(item) {
    const initialState = {
      message: `This pupil is officially enrolled?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._pupil.enrollNow(+item.id).subscribe(res => {
          if (res) {
            this.toastr.success('Pupil has officially enrolled');
            this.getPreEnroll();
          }
        });
      }
    });
  }
}
