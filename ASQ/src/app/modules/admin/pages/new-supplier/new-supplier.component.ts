import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { UsersService } from '@shared/services';
import { ConfirmationComponent } from '@shared/components/modals';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss']
})
export class NewSupplierComponent implements OnInit {
  breadcrumbs: string;
  data: Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _users: UsersService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.getUsers();
  }

  getUsers() {
    this._users.getNewSupplier().subscribe(data => {
      this.data = data;
    });
  }

  confirm(user) {
    const initialState = {
      message: `Just to confirm this supplier is already pay the registration?`,
      okButton: 'Yes'
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._users.confirmSupplier(+user.id).subscribe(res => {
          if (res) {
            this.getUsers();
          }
        });
      }
    });
  }
}
