import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '@shared/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-suggest',
  templateUrl: './product-suggest.component.html',
  styleUrls: ['./product-suggest.component.scss']
})
export class ProductSuggestComponent implements OnInit {
  productList: Array<any> = [];
  productTypeValue: number;
  budgetValue: number;

  @Input()
  set productType(type: number) {
    this.productTypeValue = type;
    this.getProductList();
  }

  @Input()
  set productBudget(budget: number) {
    this.budgetValue = budget;
    this.getProductList();
  }

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _product: ProductsService
  ) {}

  ngOnInit() {
    // this.activedRoute.params.subscribe(params => {
    //   const productId = +params['id'];
    //   this.getProductList(this.productTypeValue, productId);
    // });
  }

  getProductList() {
    if (!this.productTypeValue || !this.budgetValue) {
      return;
    }
    this._product
      .getSuggestionProduct(this.productTypeValue, this.budgetValue)
      .subscribe(res => {
        this.productList = res;
      });
  }

  openProduct(id: number) {
    this.router.navigate([`/product/${id}`]);
    // location.reload();
  }
}
