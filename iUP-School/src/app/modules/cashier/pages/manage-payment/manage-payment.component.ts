import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { AddPaymentComponent } from '../../components/modals';
import { CashierService } from '@shared/services';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.scss']
})
export class ManagePaymentComponent implements OnInit {
  criteriaList: Array<any>;

  constructor(
    private modalService: BsModalService,
    private _cashier: CashierService
  ) {}

  ngOnInit() {
    this.getCriteria();
  }

  getCriteria() {
    this._cashier.getCriteria().subscribe(res => {
      this.criteriaList = res;
    });
  }

  add() {
    const initialState = {
      isEdit: false
    };
    const modalRef = this.modalService.show(AddPaymentComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddPaymentComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getCriteria();
      }
    });
  }

  edit(item) {
    const initialState = {
      isEdit: true,
      item
    };
    const modalRef = this.modalService.show(AddPaymentComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddPaymentComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getCriteria();
      }
    });
  }

  delete(item) {
    const initialState = {
      message: `Do you want to delete '${item.name}'?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._cashier.deleteCriteria(item.id).subscribe(res => {
          if (res) {
            this.getCriteria();
          }
        });
      }
    });
  }
}
