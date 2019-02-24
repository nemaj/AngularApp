import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { LoginRouting } from './login.routing';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountSupplierComponent } from './pages/account-supplier/account-supplier.component';
import { WarningComponent } from './pages/warning/warning.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LoginRouting,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, RegisterComponent, AccountSupplierComponent, WarningComponent]
})
export class LoginModule {}
