import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LIST } from '@shared/constants/reports';
import { ReportsService, PrintTableService } from '@shared/services';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss']
})
export class ListReportComponent implements OnInit {
  breadcrumbs: string;
  type: string;

  isCollection: boolean = false;
  listCollection: Array<any>;
  isSupplier: boolean = false;
  listSupplier: Array<any>;
  isCustomer: boolean = false;
  listCustomer: Array<any>;
  isProducts: boolean = false;
  listProducts: Array<any>;
  isOrder: boolean = false;
  listOrder: Array<any>;
  isFeedback: boolean = false;
  listFeedback: Array<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _reports: ReportsService,
    private _print: PrintTableService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.activatedRoute.params.subscribe(params => {
      this.type = params['type'];
      if (!this.type) {
        this.router.navigate(['/admin']);
      }
      this.checkReportList(this.type);
    });
  }

  checkReportList(type: String) {
    this.isCollection = type === LIST.COLLECTION;
    this.isSupplier = type === LIST.SUPPLIER;
    this.isCustomer = type === LIST.CUSTOMER;
    this.isProducts = type === LIST.PRODUCT;
    this.isOrder = type === LIST.ORDERS;
    this.isFeedback = type === LIST.FEEDBACK;
    switch (type) {
      case LIST.COLLECTION:
        this.getCollection();
        break;
      case LIST.SUPPLIER:
        this.getSupplier();
        break;
      case LIST.CUSTOMER:
        this.getCustomer();
        break;
      case LIST.PRODUCT:
        this.getProducts();
        break;
      case LIST.ORDERS:
        this.getOrder();
        break;
      case LIST.FEEDBACK:
        this.getFeedback();
        break;
      default:
    }
  }

  getProducts() {
    this._reports.getListProducts().subscribe(res => {
      this.listProducts = res;
    });
  }

  printListProducts() {
    const columns = ['Name', 'Type', 'Description', 'Price', 'Stock'];
    const rows = [];
    this.listProducts.forEach((item, idx) => {
      const arr = [
        item.name,
        item.type,
        item.description,
        item.price,
        item.stock
      ];
      rows.push(arr);
    });
    this._print.generate('List of Products', columns, rows);
  }

  getCustomer() {
    this._reports.getListCustomer().subscribe(res => {
      this.listCustomer = res;
    });
  }

  printListCustomer() {
    const columns = ['Name', 'Contact Number', 'Address'];
    const rows = [];
    this.listCustomer.forEach((item, idx) => {
      const arr = [
        `${item.firstName} ${item.lastName}`,
        item.contactNumber,
        item.address
      ];
      rows.push(arr);
    });
    this._print.generate('List of Customers', columns, rows);
  }

  getSupplier() {
    this._reports.getListSupplier().subscribe(res => {
      this.listSupplier = res;
    });
  }

  printListSupplier() {
    const columns = ['Name', 'Business Name', 'License', 'Address'];
    const rows = [];
    this.listSupplier.forEach((item, idx) => {
      const arr = [
        `${item.firstName} ${item.lastName}`,
        item.businessName,
        item.businessLicense,
        item.businessAddress
      ];
      rows.push(arr);
    });
    this._print.generate('List of Supplier', columns, rows);
  }

  getCollection() {
    this._reports.getListCollection().subscribe(res => {
      this.listCollection = res;
    });
  }

  printListCollection() {
    this._print.printListCollection(this.listCollection);
  }

  getOrder() {
    this._reports.getListOrders().subscribe(res => {
      this.listOrder = res;
    });
  }

  printListOrder() {
    this._print.printListOrders(this.listOrder);
  }

  getFeedback() {
    this._reports.getListFeedback().subscribe(res => {
      this.listFeedback = res;
    });
  }

  printListFeedback() {
    this._print.printListFeedback(this.listFeedback);
  }
}
