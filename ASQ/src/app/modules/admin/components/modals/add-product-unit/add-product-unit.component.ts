import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { ProductsService } from '@shared/services';

@Component({
  selector: 'app-add-product-unit',
  templateUrl: './add-product-unit.component.html',
  styleUrls: ['./add-product-unit.component.scss']
})
export class AddProductUnitComponent implements OnInit {
  public onClose: Subject<boolean>;

  isEdit: boolean;
  typeId: number;
  type;

  constructor(
    public bsModalRef: BsModalRef,
    private _products: ProductsService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    if (this.isEdit && this.typeId) {
      this.getType(this.typeId);
    }
  }

  getType(id) {
    this._products.getEachUnit(id).subscribe(res => {
      if (res && res.unit) {
        this.type = res.unit;
      }
    });
  }

  saveType() {
    if (!this.type) {
      return;
    }

    if (!this.isEdit) {
      this._products.createUnit(this.type).subscribe(res => {
        if (res) {
          this.close(true);
        }
      });
    } else {
      const postData = {
        unit: this.type,
        id: this.typeId
      };
      this._products.updateUnits(postData).subscribe(res => {
        if (res) {
          this.close(true);
        }
      });
    }
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
