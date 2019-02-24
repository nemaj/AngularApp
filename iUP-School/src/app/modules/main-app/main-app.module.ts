import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainAppRoutingModule } from './main-app.routing';
import { SharedModule } from '@shared/shared.module';
import {
  ButtonsModule,
  TabsModule,
  BsDatepickerModule,
  ModalModule
} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { MainComponent } from './pages/main/main.component';
import { ParentInfoComponent } from './pages/parent-info/parent-info.component';
import { HomeComponent } from './pages/home/home.component';
import { PortalComponent } from './pages/portal/portal.component';
import { PreEnrollComponent } from './pages/pre-enroll/pre-enroll.component';
import { GradingComponent } from './pages/grading/grading.component';
import { Modals } from './components/modals';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    MainAppRoutingModule,
    SharedModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    HttpModule
  ],
  declarations: [
    MainComponent,
    ParentInfoComponent,
    HomeComponent,
    PortalComponent,
    PreEnrollComponent,
    GradingComponent,
    Modals
  ],
  entryComponents: [...Modals]
})
export class MainAppModule {}
