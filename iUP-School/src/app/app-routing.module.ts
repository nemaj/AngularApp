import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersCheck } from '@shared/guards';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    loadChildren: './modules/main-app/main-app.module#MainAppModule'
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: [UsersCheck]
  },
  {
    path: 'cashier',
    loadChildren: './modules/cashier/cashier.module#CashierModule',
    canActivate: [UsersCheck]
  },
  {
    path: 'create',
    loadChildren: './modules/register/register.module#RegisterModule'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
