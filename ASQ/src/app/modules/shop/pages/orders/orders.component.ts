import { Component, OnInit } from '@angular/core';
import { OrdersService, CurrentUserService } from '@shared/services';
import { ConfirmationComponent } from '@shared/components/modals';
import { BsModalService } from 'ngx-bootstrap';
import { WriteReviewComponent } from '../../components/modals/write-review/write-review.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersList: Array<any> = [];

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private _orders: OrdersService,
    private _currentUser: CurrentUserService
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    const { info } = this._currentUser.getUserInfo();
    this._orders.getOrders(info.usersId).subscribe(res => {
      this.ordersList = res;
    });
  }

  goToProductDetails(productId: number) {
    this.router.navigate([`product/${productId}`]);
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

  writeReview(productId: number, isReviewed: boolean = false) {
    const initialState = {
      productId,
      isReviewed
    };
    const modalRef = this.modalService.show(WriteReviewComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'shop-modal'
    });
    (<WriteReviewComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getOrders();
      }
    });
  }
}
