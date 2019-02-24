import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountSupplierComponent } from './pages/account-supplier/account-supplier.component';
import { WarningComponent } from './pages/warning/warning.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'create',
    component: RegisterComponent
  },
  {
    path: 'supplier',
    component: AccountSupplierComponent
  },
  {
    path: 'warning',
    component: WarningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRouting {}
