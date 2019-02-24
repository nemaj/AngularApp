import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';

import { CropperSettings } from 'ngx-img-cropper';
import { ProductsService } from '@shared/services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public onClose: Subject<boolean>;
  productId: number;
  data: any;
  cropperSettings: CropperSettings;

  constructor(
    private bsModalRef: BsModalRef,
    private _product: ProductsService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 400;
    this.cropperSettings.canvasWidth = 450;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
  }

  ngOnInit() {
    this.onClose = new Subject();
  }

  saveImage() {
    if (!this.data || !this.data.image) {
      return;
    }
    const postData = {
      productId: this.productId,
      image: this.data.image
    };
    this._product.uploadImage(postData).subscribe(res => {
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
