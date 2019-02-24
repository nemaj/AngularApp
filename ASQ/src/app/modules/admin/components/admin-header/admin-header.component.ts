import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@shared/services';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { ManageAccountComponent } from '../modals/manage-account/manage-account.component';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit() {}

  toggleSidebar() {
    this.toggle.emit();
  }

  manage() {
    const initialState = {};
    const modalRef = this.modalService.show(ManageAccountComponent, {
      initialState,
      class: 'shop-modal'
    });
    // (<AddProductTypeComponent>modalRef.content).onClose.subscribe(result => {
    //   if (result === true) {
    //     this.getTypeList();
    //   }
    // });
  }

  logout() {
    this._auth.logout();
    this.router.navigate(['/']);
  }
}
