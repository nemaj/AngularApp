import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './pages/create/create.component';
import { CreateParentComponent } from './pages/create-parent/create-parent.component';
import { RegisterRoutingModule } from './register.routing';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotVerifiedComponent } from './pages/not-verified/not-verified.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CreateComponent, CreateParentComponent, NotVerifiedComponent]
})
export class RegisterModule {}
