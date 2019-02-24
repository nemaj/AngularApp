import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@shared/services';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent implements OnInit {
  public onClose: Subject<boolean>;
  productInfo;

  productImg: Array<any> = [];

  constructor(
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private _products: ProductsService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getImages();
  }

  getImages() {
    if (!this.productInfo || !this.productInfo.id) {
      this.toastr.error('No found Image for this product.');
      this.close();
      return;
    }
    this._products.getImages(this.productInfo.id).subscribe(res => {
      this.productImg = res;
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
