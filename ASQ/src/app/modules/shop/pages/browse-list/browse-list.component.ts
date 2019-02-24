import { Component, OnInit } from '@angular/core';
import {
  BrowseService,
  ProductsService,
  CurrentUserService
} from '@shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { AddCartComponent } from '../../components/modals/add-cart/add-cart.component';
import { ToastrService } from 'ngx-toastr';

import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent
} from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-browse-list',
  templateUrl: './browse-list.component.html',
  styleUrls: ['./browse-list.component.scss']
})
export class BrowseListComponent implements OnInit {
  productList: Array<any> = [];
  productType;
  productBudget;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private _browse: BrowseService,
    private _products: ProductsService,
    private _currentUser: CurrentUserService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.browseProducts(params.budget, params.type);
      this.productBudget = params.budget;
      this.productType = params.type;
    });
  }

  browseProducts(budget: number = 0, type: number = 0) {
    if (!budget || !type) {
      this.router.navigate(['/']);
      return;
    }
    this._products.browseProducts({ budget, type }).subscribe(res => {
      this.productList = res;
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
}
