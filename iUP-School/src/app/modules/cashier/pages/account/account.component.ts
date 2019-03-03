import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PupilsService, CashierService, UsersService } from '@shared/services';

import { MONTH } from '@shared/constants/date';
import { BsModalService } from 'ngx-bootstrap';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  pupilId;
  pupilInfo;

  month;

  accountDetails: Array<any> = [];
  details: Array<any> = [];
  totalAmount: number = 0;

  isPaid: boolean = false;

  cashierInfo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private _pupil: PupilsService,
    private _cashier: CashierService,
    private _users: UsersService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getCashierInfo(currentUser.usersId);
    this.pupilId = this.activatedRoute.snapshot.params.id || 0;
    if (!this.pupilId) {
      this.router.navigate(['/cashier']);
    }
    this.getInfo();
    this.getDetails();
    const m = new Date().getMonth();
    this.month = MONTH[m];
  }

  getCashierInfo(id) {
    if (id) {
      this._users.getEachUsers(id).subscribe(res => {
        console.log('info', res);
        this.cashierInfo = res;
      });
    }
  }

  payNow() {
    if (!this.totalAmount) {
      return;
    }
    const initialState = {
      message: `Are you sure do you want to continue?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        const postData = {
          pupilId: this.pupilId,
          bills: this.details.filter(i => i.amount)
        };
        this._cashier.paybills(postData).subscribe(res => {
          if (res) {
            this.getDetails();
          }
        });
      }
    });
  }

  getInfo() {
    if (this.pupilId) {
      this._pupil.getInfo(this.pupilId).subscribe(res => {
        this.pupilInfo = res;
      });
    }
  }

  getDetails() {
    this._cashier.getDetails(this.pupilId).subscribe(res => {
      this.accountDetails = res;
      const test = res;
      let paid = true;
      this.details = test.map(obj => {
        obj.amount = null;
        obj.tempAmount = null;
        obj.checked = false || obj.price <= 0;
        obj.paid = obj.price <= 0;
        // obj.amount = obj.price;
        if (!obj.paid && paid) {
          paid = false;
        }
        return obj;
      });
      this.isPaid = paid;
    });
  }

  getTotal() {
    this.totalAmount = 0;
    this.details.forEach(i => {
      if (i.amount) {
        this.totalAmount += +i.amount;
      }
    });
  }

  checkItem(item: any) {
    if (item.checked) {
      item.tempAmount = item.amount;
      item.amount = item.price;
    } else {
      item.amount = item.tempAmount;
    }
    this.getTotal();
  }

  onBlur(item) {
    if (!item.amount) {
      console.log('blur', item);
      item.amount = item.price;
    }
  }

  onClick(item) {
    console.log('click', item);
    item.amount = null;
  }

  onChange(item, val) {
    if (+val > +item.price) {
      item.amount = item.price;
    }
    this.getTotal();
  }
}
