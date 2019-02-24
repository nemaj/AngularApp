import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier.routing';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ModalModule, TypeaheadModule } from 'ngx-bootstrap';

import { CashierComponent } from './pages/cashier/cashier.component';
import { SearchComponent } from './pages/search/search.component';
import { AccountComponent } from './pages/account/account.component';
import { ManagePaymentComponent } from './pages/manage-payment/manage-payment.component';
import { Modals } from './components/modals';

@NgModule({
  imports: [
    CommonModule,
    CashierRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    CashierComponent,
    SearchComponent,
    AccountComponent,
    ManagePaymentComponent,
    ...Modals
  ],
  entryComponents: [...Modals]
})
export class CashierModule {}
