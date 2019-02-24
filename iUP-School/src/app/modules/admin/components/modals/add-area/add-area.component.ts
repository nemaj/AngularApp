import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { UtilityService } from '@shared/services';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent implements OnInit {
  public onClose: Subject<boolean>;

  // params
  isEdit: boolean;
  item;

  // forms
  @ViewChild('areaForm') areaForm: HTMLFormElement;
  area;
  areaId: number = 0;

  constructor(
    private bsModalRef: BsModalRef,
    private _utility: UtilityService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    if (this.isEdit) {
      this.area = this.item.area;
      this.areaId = this.item.id;
    }
  }

  submit(status) {
    if (status) {
      return;
    }

    this._utility.addArea({ area: this.area }, this.areaId).subscribe(res => {
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
