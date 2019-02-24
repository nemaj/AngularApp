import { Component, OnInit } from '@angular/core';
import { UsersService, ProductsService } from '@shared/services';
import { AddProductTypeComponent } from '../../components/modals/add-product-type/add-product-type.component';
import { BsModalService } from 'ngx-bootstrap';
import { ConfirmationComponent } from '@shared/components/modals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  data: Array<any> = [];
  breadcrumbs: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _products: ProductsService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.getTypeList();
  }

  getTypeList() {
    this._products.getTypes().subscribe(res => {
      if (res && res.length) {
        this.data = res;
      }
    });
  }

  addUser(id = 0, isEdit = false) {
    const initialState = {
      isEdit: isEdit,
      typeId: id
    };
    const modalRef = this.modalService.show(AddProductTypeComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<AddProductTypeComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getTypeList();
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
        this._products.removeType(type.id).subscribe(res => {
          if (res) {
            this.getTypeList();
          }
        });
      }
    });
  }
}
