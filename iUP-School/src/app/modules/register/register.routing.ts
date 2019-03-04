import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './pages/create/create.component';
import { CreateParentComponent } from './pages/create-parent/create-parent.component';
import { NotVerifiedComponent } from './pages/not-verified/not-verified.component';

export const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    children: [
      { path: '', redirectTo: 'parent', pathMatch: 'full' },
      {
        path: 'parent',
        component: CreateParentComponent,
        data: { type: 'Parent' }
      },
      {
        path: 'teacher',
        component: CreateParentComponent,
        data: { type: 'Teacher' }
      },
      {
        path: 'not-verified',
        component: NotVerifiedComponent
      }
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
export class RegisterRoutingModule {}
