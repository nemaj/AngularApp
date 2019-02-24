import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FeedbackService, ProductsService } from '@shared/services';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.scss']
})
export class ViewReviewsComponent implements OnInit {
  public onClose: Subject<boolean>;
  productId: number;
  productInfo: any;
  reviewList: Array<any> = [];

  constructor(
    private bsModalRef: BsModalRef,
    private _product: ProductsService,
    private _feedback: FeedbackService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getProductInfo();
    this.getReviews();
  }

  getProductInfo() {
    this._product.getEactProduct(this.productId).subscribe(res => {
      this.productInfo = res;
    });
  }

  getReviews() {
    this._feedback.getReviewByProduct(this.productId).subscribe(res => {
      this.reviewList = res;
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
