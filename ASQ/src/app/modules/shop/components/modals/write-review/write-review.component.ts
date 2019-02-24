import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import {
  ProductsService,
  FeedbackService,
  CurrentUserService
} from '@shared/services';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  public onClose: Subject<boolean>;
  productId: number;
  isReviewed: boolean;
  productDetails: any;

  reviewId: number;
  review: string;
  productRate: number;

  constructor(
    private bsModalRef: BsModalRef,
    private _product: ProductsService,
    private _currentUser: CurrentUserService,
    private _feedback: FeedbackService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getProductDetails();
    this.getReviewDetails();
  }

  getProductDetails() {
    this._product.getEactProduct(this.productId).subscribe(res => {
      this.productDetails = res;
    });
  }

  getReviewDetails() {
    if (this.isReviewed) {
      const { info } = this._currentUser.getUserInfo();
      this._feedback
        .getEachReview({ usersId: info.usersId, productId: this.productId })
        .subscribe(res => {
          this.reviewId = res.id;
          this.review = res.message;
          this.productRate = +res.rate;
        });
    }
  }

  submitReview() {
    if (this.isFormFilled()) {
      const { info } = this._currentUser.getUserInfo();
      const postData = {
        usersId: +info.usersId,
        productId: this.productId,
        message: this.review,
        rate: this.productRate
      };
      this._feedback.addReview(postData, this.reviewId || 0).subscribe(res => {
        if (res) {
          this.close(true);
        }
      });
    }
  }

  _getRate(evt) {
    if (!this.isReviewed) {
      this.productRate = evt.newRate;
    }
  }

  isFormFilled() {
    return !(!this.productRate || !this.review);
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
