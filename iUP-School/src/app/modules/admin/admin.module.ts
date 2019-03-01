import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import {
  ModalModule,
  BsDatepickerModule,
  TimepickerModule,
  TabsModule
} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModals } from './components/modals';
import { FullCalendarModule } from 'ng-fullcalendar';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { HttpModule } from '@angular/http';
import { FileSaverModule } from 'ngx-filesaver';

import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ClassSchedulesComponent } from './pages/class-schedules/class-schedules.component';
import { LearnMaterialsComponent } from './pages/learn-materials/learn-materials.component';
import { EnrollComponent } from './pages/enroll/enroll.component';
import { TeacherInfoComponent } from './components/modals/teacher-info/teacher-info.component';
import { UtilityComponent } from './pages/utility/utility.component';
import { ReportsComponent } from './pages/reports/reports.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule.forRoot(),
    FullCalendarModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    FileUploadModule,
    HttpModule,
    FileSaverModule,
    TabsModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    ...AdminModals,
    TeacherComponent,
    ActivitiesComponent,
    ClassSchedulesComponent,
    LearnMaterialsComponent,
    EnrollComponent,
    TeacherInfoComponent,
    UtilityComponent,
    ReportsComponent
  ],
  entryComponents: [...AdminModals]
})
export class AdminModule {}
