import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@shared/services';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '@shared/components/modals';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  breadcrumbs;
  products: Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _product: ProductsService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.getALlProduct();
  }

  getALlProduct() {
    this._product.getAllProducts().subscribe(res => {
      console.log('list', res);
      this.products = res;
    });
  }

  delete(productId) {
    const initialState = {
      message: `Do you want to delete this product?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._product.removeProduct(productId).subscribe(res => {
          if (res) {
            this.getALlProduct();
          }
        });
      }
    });
  }
}
