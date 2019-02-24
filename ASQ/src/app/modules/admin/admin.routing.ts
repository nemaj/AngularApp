import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductTypeComponent } from './pages/product-type/product-type.component';
import { UsersComponent } from './pages/users/users.component';
import { ListReportComponent } from './pages/list-report/list-report.component';
import { ChartReportComponent } from './pages/chart-report/chart-report.component';
import { FarmerChartComponent } from './pages/farmer-chart/farmer-chart.component';
import { SupplierChartComponent } from './pages/supplier-chart/supplier-chart.component';
import { NewSupplierComponent } from './pages/new-supplier/new-supplier.component';
import { ProductUnitComponent } from './pages/product-unit/product-unit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { page: 'dashboard' }
      },
      {
        path: 'product-type',
        component: ProductTypeComponent,
        data: { page: 'Products' }
      },
      {
        path: 'product-unit',
        component: ProductUnitComponent,
        data: { page: 'Products' }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { page: 'Users' }
      },
      {
        path: 'suppliers',
        component: NewSupplierComponent,
        data: { page: 'New Suppliers' }
      },
      {
        path: 'list/:type',
        component: ListReportComponent,
        data: { page: 'list reports' }
      },
      {
        path: 'chart/collection',
        component: ChartReportComponent,
        data: { page: 'chart reports' }
      },
      {
        path: 'chart/farmer',
        component: FarmerChartComponent,
        data: { page: 'chart reports' }
      },
      {
        path: 'chart/supplier',
        component: SupplierChartComponent,
        data: { page: 'chart reports' }
      },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {}
