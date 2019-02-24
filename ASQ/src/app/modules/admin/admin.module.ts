import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRouting } from './admin.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { SidebarModule } from 'ng-sidebar';

import { DataTableModule } from 'angular-6-datatable';
import { ModalModule } from 'ngx-bootstrap';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AdminModals } from './components/modals';

import { AdminComponent } from './pages/admin/admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminBreadcrumbsComponent } from './components/admin-breadcrumbs/admin-breadcrumbs.component';
import { AddUserComponent } from './components/modals/add-user/add-user.component';
import { UsersTypeComponent } from './components/modals/users-type/users-type.component';
import { ProductTypeComponent } from './pages/product-type/product-type.component';
import { AddProductTypeComponent } from './components/modals/add-product-type/add-product-type.component';
import { UsersComponent } from './pages/users/users.component';
import { ListReportComponent } from './pages/list-report/list-report.component';
import { ChartReportComponent } from './pages/chart-report/chart-report.component';
import { FarmerChartComponent } from './pages/farmer-chart/farmer-chart.component';
import { SupplierChartComponent } from './pages/supplier-chart/supplier-chart.component';
import { NewSupplierComponent } from './pages/new-supplier/new-supplier.component';
import { ProductUnitComponent } from './pages/product-unit/product-unit.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    SharedModule,
    AdminRouting,
    SidebarModule.forRoot(),
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    ChartsModule
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    DashboardComponent,
    AdminBreadcrumbsComponent,
    ...AdminModals,
    ProductTypeComponent,
    UsersComponent,
    ListReportComponent,
    ChartReportComponent,
    FarmerChartComponent,
    SupplierChartComponent,
    NewSupplierComponent,
    ProductUnitComponent
  ],
  entryComponents: [...AdminModals]
})
export class AdminModule {}
