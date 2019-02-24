import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login.routing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, FormsModule, SharedModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
