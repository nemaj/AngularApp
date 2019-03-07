import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersCheck } from '@shared/guards';

import { MainComponent } from './pages/main/main.component';
import { ParentInfoComponent } from './pages/parent-info/parent-info.component';
import { HomeComponent } from './pages/home/home.component';
import { PortalComponent } from './pages/portal/portal.component';
import { PreEnrollComponent } from './pages/pre-enroll/pre-enroll.component';
import { GradingComponent } from './pages/grading/grading.component';
import { TeacherManageInfoComponent } from './pages/teacher-manage-info/teacher-manage-info.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'portal', component: PortalComponent, canActivate: [UsersCheck] },
      {
        path: 'pre-enroll',
        component: PreEnrollComponent,
        data: { pageTitle: 'Pre Enrollment' },
        canActivate: [UsersCheck]
      },
      {
        path: 'pre-enroll/:id',
        component: PreEnrollComponent,
        data: { pageTitle: 'Pre Enrollment' },
        canActivate: [UsersCheck]
      },
      {
        path: 'add-pupil',
        component: PreEnrollComponent,
        data: { pageTitle: 'Pupil Form' },
        canActivate: [UsersCheck]
      },
      {
        path: 'grading',
        component: GradingComponent,
        data: { pageTitle: 'Grading System' },
        canActivate: [UsersCheck]
      },
      {
        path: 'parent/:username',
        component: ParentInfoComponent,
        data: { type: 'Parent' },
        canActivate: [UsersCheck]
      },
      {
        path: 'teacher/:username',
        component: TeacherManageInfoComponent,
        data: { type: 'Teacher' },
        canActivate: [UsersCheck]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule {}
