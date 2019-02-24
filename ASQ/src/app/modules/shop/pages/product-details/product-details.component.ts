import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProductsService,
  BusinessService,
  FeedbackService,
  CurrentUserService
} from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewReviewsComponent } from '../../components/modals/view-reviews/view-reviews.component';
import { BsModalService } from 'ngx-bootstrap';
import { AddCartComponent } from '../../components/modals/add-cart/add-cart.component';
import { ToastrService } from 'ngx-toastr';
import { ViewImagesComponent } from '../../components/modals/view-images/view-images.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId;
  productInfo;
  supplierInfo;

  isCustomer: boolean = false;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private _product: ProductsService,
    private _business: BusinessService,
    private _currentUser: CurrentUserService
  ) {}

  ngOnInit() {
    this.productId = this.activedRoute.snapshot.params.id || 0;
    const { isCustomer } = this._currentUser.getUserInfo();
    this.isCustomer = isCustomer;
    this.activedRoute.params.subscribe(params => {
      this.productId = +params['id'];
      this.getEactProduct(this.productId);
    });
  }

  getEactProduct(id: number) {
    window.scrollTo(0, 0);
    this._product.getEactProduct(id).subscribe(res => {
      this.productInfo = res;
      this.getSupplierInfo(res.businessId);
    });
  }

  getSupplierInfo(id: number) {
    this._business.getSupplierInfoById(id).subscribe(res => {
      this.supplierInfo = res;
    });
  }

  viewReviews(reviewCount: number) {
    if (!reviewCount) {
      return;
    }
    const initialState = {
      productId: this.productId
    };
    const modalRef = this.modalService.show(ViewReviewsComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'shop-modal'
    });
  }

  addToCart(productId: number, businessId: number) {
    const currentUser = this._currentUser.getUserInfo();
    if (currentUser.isCustomer) {
      const initialState = {
        usersId: +currentUser.info.usersId,
        productId,
        businessId
      };
      const modalRef = this.modalService.show(AddCartComponent, {
        initialState,
        class: 'shop-modal'
      });
    } else if (!currentUser.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.toastr.warning('Service is unavailable!');
    }
  }

  viewImages() {
    const initialState = {
      productInfo: this.productInfo
    };
    const modalRef = this.modalService.show(ViewImagesComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'shop-modal'
    });
  }
}
