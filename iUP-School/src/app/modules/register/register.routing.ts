import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './pages/create/create.component';
import { CreateParentComponent } from './pages/create-parent/create-parent.component';

export const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    children: [
      { path: '', redirectTo: 'parent', pathMatch: 'full' },
      { path: 'parent', component: CreateParentComponent }
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
