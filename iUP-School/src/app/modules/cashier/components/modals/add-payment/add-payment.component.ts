import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { CashierService, OptionsService } from '@shared/services';

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
  level;
  itemId: number = 0;

  gradeLevel: Array<any> = [];

  constructor(
    private bsModalRef: BsModalRef,
    private _option: OptionsService,
    private _cashier: CashierService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.getLevel();
    if (this.isEdit) {
      this.payment = this.item.name;
      this.price = this.item.price;
      this.level = this.item.level;
      this.itemId = this.item.id;
    }
  }

  getLevel() {
    this._option.getLevel().subscribe(res => {
      console.log('level', res);
      this.gradeLevel = res;
    });
  }

  submit(status) {
    if (status) {
      return;
    }
    const postData = {
      payment: this.payment,
      price: this.price,
      level: this.level
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
