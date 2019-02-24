import { Component, OnInit } from '@angular/core';
import {
  CartService,
  CurrentUserService,
  OrdersService,
  UsersService
} from '@shared/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProductList: Array<any> = [];
  customerInfo: any;
  selectAll: boolean = false;
  subTotal: number;
  totalItem: number;

  isCartEmpty: boolean = false;
  isCustomerAddressNotEmpty: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _users: UsersService,
    private _cartService: CartService,
    private _currentUser: CurrentUserService,
    private _orders: OrdersService
  ) {}

  ngOnInit() {
    this.getCustomerInfo();
    this.getCartProducts();
  }

  proceedToCheckout() {
    const { info } = this._currentUser.getUserInfo();
    this._users.checkCustomerStatus(+info.usersId).subscribe(res => {
      if (res) {
        const postData = [];
        this.cartProductList.forEach(obj => {
          obj.products.forEach(item => {
            if (item.checked) {
              const data = {
                usersId: +info.usersId,
                cartId: +item.id,
                productId: +item.product_id,
                quantity: +item.quantity
              };
              postData.push(data);
            }
          });
        });
        this._orders.saveOrder(postData).subscribe(r => {
          if (r) {
            this.router.navigate(['/orders']);
          }
        });
      } else {
        this.router.navigate(['/customer-info']);
      }
    });
  }

  getCustomerInfo() {
    const { info } = this._currentUser.getUserInfo();
    this._users.getCompleteInfo(info.usersId).subscribe(res => {
      this.customerInfo = res || {};
      this.isCustomerAddressNotEmpty =
        !res || !res.street || !res.barangay || !res.city || !res.province;
    });
  }

  getCartProducts() {
    const currentUser = this._currentUser.getUserInfo();
    this._cartService
      .getCartProduct(currentUser.info.usersId)
      .subscribe(res => {
        if (!res || !res.length) {
          this.cartProductList = [];
          this.isCartEmpty = true;
          return;
        }
        this.cartProductList = res.map(obj => {
          obj.checked = false;
          obj.products.map(i => {
            i.discount = +i.quantity >= 5;
            i.checked = false;
            return i;
          });
          return obj;
        });
        this.getSubTotal();
      });
  }

  getSubTotal() {
    setTimeout(() => {
      this.subTotal = 0;
      this.totalItem = 0;
      this.cartProductList.forEach(obj => {
        obj.products.forEach(item => {
          if (item.checked) {
            const totalPrice = +item.price * +item.quantity;
            const discount = item.discount ? totalPrice * 0.05 : 0;
            this.subTotal = this.subTotal + (totalPrice - discount);
            this.totalItem = this.totalItem + +item.quantity;
          }
        });
      });
    }, 500);
  }

  selectAllProduct(checked: boolean) {
    this.cartProductList.map((obj, idx) => {
      obj.checked = checked;
      this.selectSupplier(idx, checked);
      return obj;
    });
  }

  selectSupplier(idx: number, checked: boolean) {
    this.cartProductList[idx].products.map(i => {
      i.checked = checked;
      return i;
    });
    this.getSubTotal();
  }

  selectProduct(idx: number, product: any) {
    if (product.checked) {
      this.cartProductList[idx].checked = false;
    } else {
      const productNotSelected = this.cartProductList[idx].products.filter(
        i => !i.checked
      );
      const isSelectAll =
        productNotSelected.length === 1 &&
        !!productNotSelected.find(i => i.id === product.id);
      if (isSelectAll) {
        this.cartProductList[idx].checked = true;
      }
    }
    this.getSubTotal();
  }

  goToProductDetails(productId: number) {
    this.router.navigate([`product/${productId}`]);
  }

  manageQuantity(type: string, product) {
    if (this.isQuantityDisabled(+product.quantity, +product.stock, type)) {
      return;
    }
    const postData = {
      id: product.id,
      stock: 0
    };
    if (type === 'plus') {
      product.quantity++;
      postData.stock = product.quantity;
    } else {
      product.quantity--;
      postData.stock = product.quantity;
    }
    product.discount = +product.quantity >= 5;
    this.getSubTotal();
    this._cartService.manageQuantity(postData).subscribe(res => {
      if (!res) {
        this.toastr.error('Out of Stock!');
      }
    });
  }

  isQuantityDisabled(quantity: number, stock: number, type: string) {
    return (
      (quantity === 1 && type === 'minus') ||
      (quantity === stock && type === 'plus')
    );
  }

  checkCartList() {
    this.isCartEmpty = !this.cartProductList.length;
  }

  removeProduct(id: number, idx: number, prodIdx: number) {
    this._cartService.removeProduct(id).subscribe(res => {
      if (res) {
        if (this.cartProductList[idx].products.length > 1) {
          this.cartProductList[idx].products.splice(prodIdx, 1);
        } else {
          this.cartProductList.splice(idx, 1);
        }
        this.checkCartList();
      }
    });
  }
}
