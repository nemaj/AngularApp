import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { ProductsService } from '@shared/services';
import { AddProductUnitComponent } from '../../components/modals/add-product-unit/add-product-unit.component';
import { ConfirmationComponent } from '@shared/components/modals';

@Component({
  selector: 'app-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.scss']
})
export class ProductUnitComponent implements OnInit {
  data: Array<any> = [];
  breadcrumbs: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _products: ProductsService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.getList();
  }

  getList() {
    this._products.getUnits().subscribe(res => {
      if (res && res.length) {
        this.data = res;
      }
    });
  }

  addUnit(id = 0, isEdit = false) {
    const initialState = {
      isEdit: isEdit,
      typeId: id
    };
    const modalRef = this.modalService.show(AddProductUnitComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<AddProductUnitComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getList();
      }
    });
  }

  deleteUser(type) {
    const initialState = {
      message: `Do you want to delete
      '${type.type}'
      from the list?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._products.removeUnits(type.id).subscribe(res => {
          if (res) {
            this.getList();
          }
        });
      }
    });
  }
}
