import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { ProductsService, CartService } from '@shared/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {
  public onClose: Subject<boolean>;
  usersId: number;
  productId: number;
  businessId: number;

  quantity: number = 1;

  productDetails: any;

  constructor(
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private _product: ProductsService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getDetails();
  }

  getDetails() {
    if (this.productId) {
      this._product.getEactProduct(this.productId).subscribe(res => {
        this.productDetails = res;
      });
    }
  }

  addProduct() {
    const postData = {
      usersId: this.usersId,
      productId: this.productId,
      businessId: this.businessId,
      quantity: this.quantity
    };
    this._cartService.saveProductToCart(postData).subscribe(res => {
      if (res) {
        this.close(true);
      }
    });
  }

  manageQuantity(type: string) {
    if (this.isButtonDisabled(+this.productDetails.stock, type)) {
      return;
    }
    if (type === 'plus') {
      this.quantity++;
    } else {
      this.quantity--;
    }
  }

  isButtonDisabled(stock: number, type: string) {
    return (
      (this.quantity === 1 && type === 'minus') ||
      (this.quantity === stock && type === 'plus')
    );
  }

  productUnavailable() {
    return !(this.productDetails && +this.productDetails.stock);
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
