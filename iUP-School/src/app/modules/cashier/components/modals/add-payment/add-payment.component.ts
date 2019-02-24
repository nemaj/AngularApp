import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { CashierService } from '@shared/services';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  public onClose: Subject<boolean>;

  isEdit: boolean = false;
  item;

  // forms
  @ViewChild('paymentForm') paymentForm: HTMLFormElement;
  payment;
  price;
  itemId: number = 0;

  constructor(
    private bsModalRef: BsModalRef,
    private _cashier: CashierService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    if (this.isEdit) {
      this.payment = this.item.name;
      this.price = this.item.price;
      this.itemId = this.item.id;
    }
  }

  submit(status) {
    if (status) {
      return;
    }
    const postData = {
      payment: this.payment,
      price: this.price
    };
    this._cashier.addCriteria(postData, this.itemId).subscribe(res => {
      if (res) {
        this.close(true);
      }
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}
