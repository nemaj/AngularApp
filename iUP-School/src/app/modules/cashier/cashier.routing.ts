import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashierComponent } from './pages/cashier/cashier.component';
import { SearchComponent } from './pages/search/search.component';
import { AccountComponent } from './pages/account/account.component';
import { ManagePaymentComponent } from './pages/manage-payment/manage-payment.component';
import { ListPupilsComponent } from './pages/list-pupils/list-pupils.component';

export const routes: Routes = [
  {
    path: '',
    component: CashierComponent,
    children: [
      { path: '', component: SearchComponent },
      { path: 'account/:id', component: AccountComponent },
      { path: 'settings', component: ManagePaymentComponent },
      { path: 'list', component: ListPupilsComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierRoutingModule {}
