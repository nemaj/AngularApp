import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROLES } from '@shared/constants/users';
import {
  AuthService,
  BusinessService,
  UsersService,
  ProductsService
} from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { BrowseProductComponent } from 'app/modules/shop/components/modals/browse-product/browse-product.component';
import { ManageAccountComponent } from 'app/modules/admin/components/modals/manage-account/manage-account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  users;
  isLogin: boolean = false;
  isAdmin: boolean = false;
  isCustomer: boolean = false;
  isSupplier: boolean = false;

  supplierInfo: any;
  supplierName;
  customerInfo: any;

  searchInput: any;
  types: Array<any> = [];

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private _auth: AuthService,
    private _business: BusinessService,
    private _users: UsersService,
    private _product: ProductsService
  ) {}

  ngOnInit() {
    this.checkUser();
    this.getProductType();
  }

  checkUser() {
    const currentUser = localStorage.getItem('currentUser');
    this.isLogin = currentUser ? true : false;
    if (this.isLogin) {
      this.users = JSON.parse(currentUser);
      this.isAdmin = this.users && +this.users.role === ROLES.ADMIN;
      this.isCustomer = this.users && +this.users.role === ROLES.CUSTOMER;
      this.isSupplier = this.users && +this.users.role === ROLES.SUPPLIER;
      if (this.isSupplier) {
        if (+this.users.otherId) {
          this._business
            .getSupplierInfoById(this.users.otherId)
            .subscribe(res => {
              this.supplierInfo = res;
              this.supplierName = res.name;
            });
        } else {
          this.supplierName = this.users.username;
        }
      } else if (this.isCustomer) {
        this._users.getUserInfo(this.users.usersId).subscribe(res => {
          this.customerInfo = res;
        });
      }
    }
  }

  browseProduct() {
    const initialState = {};
    const modalRef = this.modalService.show(BrowseProductComponent, {
      initialState,
      class: 'shop-modal'
    });
  }

  getProductType() {
    this._product.getTypes().subscribe(res => {
      this.types = res;
    });
  }

  searchProduct() {
    if (!this.searchInput) {
      return;
    }
    this.router.navigate([`/search/${this.searchInput}`]);
  }

  keySearch(evt) {
    if (evt.keyCode === 13) {
      this.searchProduct();
    }
  }

  manage() {
    const initialState = {};
    const modalRef = this.modalService.show(ManageAccountComponent, {
      initialState,
      class: 'shop-modal'
    });
  }

  logout() {
    this._auth.logout();
    this.router.navigate(['/login']);
  }
}
