import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ClassSchedulesComponent } from './pages/class-schedules/class-schedules.component';
import { LearnMaterialsComponent } from './pages/learn-materials/learn-materials.component';
import { EnrollComponent } from './pages/enroll/enroll.component';
import { UtilityComponent } from './pages/utility/utility.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { pageTitle: 'Dashboard' }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { pageTitle: 'Users' }
      },
      {
        path: 'teacher',
        component: TeacherComponent,
        data: { pageTitle: 'Teachers' }
      },
      {
        path: 'enroll',
        component: EnrollComponent,
        data: { pageTitle: 'Enroll Pupils' }
      },
      {
        path: 'activities',
        component: ActivitiesComponent,
        data: { pageTitle: 'Activities' }
      },
      {
        path: 'schedules',
        component: ClassSchedulesComponent,
        data: { pageTitle: 'Class Schedules' }
      },
      {
        path: 'materials',
        component: LearnMaterialsComponent,
        data: { pageTitle: 'Instrumental Materials' }
      },
      {
        path: 'utilities',
        component: UtilityComponent,
        data: { pageTitle: 'Utilities' }
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
