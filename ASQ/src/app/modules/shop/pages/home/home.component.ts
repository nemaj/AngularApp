import { Component, OnInit } from '@angular/core';
import {
  ProductsService,
  CartService,
  CurrentUserService
} from '@shared/services';
import { AddCartComponent } from '../../components/modals/add-cart/add-cart.component';
import { BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productList: Array<any> = [];

  bannerImg = `${location.origin}/assets/images/Banner_Agriculture.jpg`;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private _product: ProductsService,
    private _cart: CartService,
    private _currentUser: CurrentUserService
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this._product.getProductForHome().subscribe(res => {
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
