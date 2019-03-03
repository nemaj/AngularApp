import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { UtilityService } from '@shared/services';

@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrls: ['./add-level.component.scss']
})
export class AddLevelComponent implements OnInit {
  public onClose: Subject<boolean>;
  // params
  isEdit: boolean;
  item;
  level;
  levelId = 0;

  constructor(
    private bsModalRef: BsModalRef,
    private _utility: UtilityService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    if (this.isEdit) {
      this.level = this.item.level;
      this.levelId = this.item.id;
    }
  }

  submit() {
    if (!this.level) {
      return;
    }

    this._utility
      .addLevel({ level: this.level }, this.levelId)
      .subscribe(res => {
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
