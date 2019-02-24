import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { ProductsService, BrowseService } from '@shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-product',
  templateUrl: './browse-product.component.html',
  styleUrls: ['./browse-product.component.scss']
})
export class BrowseProductComponent implements OnInit {
  public onClose: Subject<boolean>;
  productType;

  // form
  budget: number;
  types: string = '';

  constructor(
    private router: Router,
    private bsModalRef: BsModalRef,
    private _products: ProductsService,
    private _browse: BrowseService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getTypes();
  }

  getTypes() {
    this._products.getTypes().subscribe(res => {
      this.productType = res;
    });
  }

  submit(invalid: boolean) {
    if (invalid) {
      return;
    }
    const postData = {
      budget: this.budget,
      type: +this.types
    };
    // this._browse.setData(postData);
    this.router.navigate(['/search'], { queryParams: postData });
    this.close();
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
