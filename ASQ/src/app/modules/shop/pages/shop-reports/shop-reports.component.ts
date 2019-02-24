import { Component, OnInit } from '@angular/core';
import { ReportsService, PrintTableService } from '@shared/services';

@Component({
  selector: 'app-shop-reports',
  templateUrl: './shop-reports.component.html',
  styleUrls: ['./shop-reports.component.scss']
})
export class ShopReportsComponent implements OnInit {
  supplierId;
  isAllow: boolean = false;
  reports = '';

  listCollection: Array<any> = [];
  listProduct: Array<any> = [];
  listOrder: Array<any> = [];
  listFeedback: Array<any> = [];

  constructor(
    private _reports: ReportsService,
    private _print: PrintTableService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.otherId) {
      this.supplierId = currentUser.otherId;
      this.isAllow = true;
    }
  }

  getType(val) {
    if (val === '1') {
      this.getCollection();
    } else if (val === '2') {
      this.getProducts();
    } else if (val === '3') {
      this.getOrders();
    } else {
      this.getFeedback();
    }
  }

  getCollection() {
    if (this.supplierId) {
      this._reports.getListCollectionBy(this.supplierId).subscribe(res => {
        this.listCollection = res;
      });
    }
  }

  printListCollection(list: Array<any>) {
    const columns = ['Name', 'Date', 'Price', 'Quantity', 'Total'];
    const rows = [];
    list.forEach((item, idx) => {
      const arr = [
        item.productName,
        item.date,
        item.productPrice,
        item.quantity,
        item.totalPrice
      ];
      rows.push(arr);
    });
    this._print.generate('List of Collection', columns, rows);
  }

  getProducts() {
    if (this.supplierId) {
      this._reports.getListProductBy(this.supplierId).subscribe(res => {
        this.listProduct = res;
      });
    }
  }

  printProductList() {
    const columns = ['Name', 'Type', 'Price', 'Stock'];
    const rows = [];
    this.listProduct.forEach((item, idx) => {
      const arr = [item.name, item.type, item.price, item.stock];
      rows.push(arr);
    });
    this._print.generate('List of Products', columns, rows);
  }

  getOrders() {
    if (this.supplierId) {
      this._reports.getListOrderBy(this.supplierId).subscribe(res => {
        this.listOrder = res;
      });
    }
  }

  printListOrders() {
    this._print.printListOrders(this.listOrder);
  }

  getFeedback() {
    if (this.supplierId) {
      this._reports.getListFeedbackBy(this.supplierId).subscribe(res => {
        this.listFeedback = res;
      });
    }
  }

  printListFeedback() {
    this._print.printListFeedback(this.listFeedback);
  }
}
