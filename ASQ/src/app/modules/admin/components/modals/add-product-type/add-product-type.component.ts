import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { ProductsService } from '@shared/services';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss']
})
export class AddProductTypeComponent implements OnInit {
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
    this._products.getEachType(id).subscribe(res => {
      if (res && res.type) {
        this.type = res.type;
      }
    });
  }

  saveType() {
    if (!this.type) {
      return;
    }

    if (!this.isEdit) {
      this._products.createType(this.type).subscribe(res => {
        if (res) {
          this.close(true);
        }
      });
    } else {
      const postData = {
        type: this.type,
        id: this.typeId
      };
      this._products.updateTypes(postData).subscribe(res => {
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
