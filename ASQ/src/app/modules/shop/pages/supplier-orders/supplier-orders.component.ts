import { Component, OnInit } from '@angular/core';
import { CurrentUserService, OrdersService } from '@shared/services';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '@shared/components/modals';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-supplier-orders',
  templateUrl: './supplier-orders.component.html',
  styleUrls: ['./supplier-orders.component.scss']
})
export class SupplierOrdersComponent implements OnInit {
  ordersList;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private _currentUser: CurrentUserService,
    private _orders: OrdersService
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    const { info } = this._currentUser.getUserInfo();
    this._orders.getOrdersForSupplier(info.usersId).subscribe(res => {
      console.log('res', res);
      this.ordersList = res;
    });
  }

  receivedOrder(code: any) {
    const initialState = {
      message: `Order with code #${code} received?`,
      okButton: 'Received'
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._orders.orderReceived(code).subscribe(res => {
          if (res) {
            this.getOrders();
          }
        });
      }
    });
  }
}
