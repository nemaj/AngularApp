import { Component, OnInit } from '@angular/core';
import { UtilityService } from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { AddAreaComponent } from '../../components/modals/add-area/add-area.component';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';
import { AddSubjectComponent } from '../../components/modals/add-subject/add-subject.component';
import { AddLevelComponent } from '../../components/modals/add-level/add-level.component';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent implements OnInit {
  ListOfArea: Array<any> = [];
  ListOfSubjects: Array<any> = [];
  ListOfLevel: Array<any> = [];

  constructor(
    private modalService: BsModalService,
    private _utility: UtilityService
  ) {}

  ngOnInit() {
    this.getAreas();
    this.getSubjects();
    this.getLevels();
  }

  getAreas() {
    this._utility.getAreas().subscribe(res => {
      this.ListOfArea = res;
    });
  }

  add() {
    const initialState = {
      isEdit: false
    };
    const modalRef = this.modalService.show(AddAreaComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddAreaComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getAreas();
      }
    });
  }

  edit(item) {
    const initialState = {
      isEdit: true,
      item
    };
    const modalRef = this.modalService.show(AddAreaComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddAreaComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getAreas();
      }
    });
  }

  delete(item) {
    const initialState = {
      message: `Do you want to delete '${item.area}' learning area?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._utility.deleteArea(item.id).subscribe(res => {
          if (res) {
            this.getAreas();
          }
        });
      }
    });
  }

  getSubjects() {
    this._utility.getSubjects().subscribe(res => {
      this.ListOfSubjects = res;
    });
  }

  addSubject() {
    const initialState = {
      isEdit: false
    };
    const modalRef = this.modalService.show(AddSubjectComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddSubjectComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getSubjects();
      }
    });
  }

  editSubject(item) {
    const initialState = {
      isEdit: true,
      item
    };
    const modalRef = this.modalService.show(AddSubjectComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddSubjectComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getSubjects();
      }
    });
  }

  deleteSubject(item) {
    const initialState = {
      message: `Do you want to delete '${item.subject}' subject?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._utility.deleteSubject(item.id).subscribe(res => {
          if (res) {
            this.getSubjects();
          }
        });
      }
    });
  }

  getLevels() {
    this._utility.getLevel().subscribe(res => {
      this.ListOfLevel = res;
    });
  }

  addLevel() {
    const initialState = {
      isEdit: false
    };
    const modalRef = this.modalService.show(AddLevelComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddLevelComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getLevels();
      }
    });
  }

  editLevel(item) {
    const initialState = {
      isEdit: true,
      item
    };
    const modalRef = this.modalService.show(AddLevelComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddLevelComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getLevels();
      }
    });
  }

  deleteLevel(item) {
    const initialState = {
      message: `Do you want to delete '${item.level}'?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._utility.deleteLevel(item.id).subscribe(res => {
          if (res) {
            this.getLevels();
          }
        });
      }
    });
  }
}
