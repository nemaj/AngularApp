import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, CurrentUserService } from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { AddCartComponent } from '../../components/modals/add-cart/add-cart.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  searchInput: string;
  productType: number;
  productList: Array<any> = [];

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _product: ProductsService,
    private _currentUser: CurrentUserService
  ) {}

  ngOnInit() {
    const { params } = this.activedRoute.snapshot;
    if (params && params.text) {
      this.searchInput = params.text;
      this.getProducts();
    } else if (params && params.id) {
      this.productType = params.id;
      this.getProductsByType();
    }
    this.activedRoute.params.subscribe(arg => {
      if (arg['text']) {
        this.searchInput = arg['text'];
        this.getProducts();
      } else if (arg['id']) {
        this.productType = +arg['id'];
        this.getProductsByType();
      }
    });
  }

  getProducts() {
    this._product.searchProduct(this.searchInput).subscribe(res => {
      this.productList = res;
    });
  }

  getProductsByType() {
    this._product.searchProductByType(this.productType).subscribe(res => {
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
