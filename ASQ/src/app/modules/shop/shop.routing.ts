import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersCheck, CustomerCheck } from '@shared/guards';

import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomerAddInfoComponent } from './pages/customer-add-info/customer-add-info.component';
import { SupplierAddInfoComponent } from './pages/supplier-add-info/supplier-add-info.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SupplierOrdersComponent } from './pages/supplier-orders/supplier-orders.component';
import { BrowseListComponent } from './pages/browse-list/browse-list.component';
import { ShopReportsComponent } from './pages/shop-reports/shop-reports.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'customer-info',
        component: CustomerAddInfoComponent,
        canActivate: [UsersCheck]
      },
      {
        path: 'profile',
        component: CustomerProfileComponent,
        canActivate: [UsersCheck]
      },
      {
        path: 'business',
        component: SupplierComponent,
        canActivate: [UsersCheck]
      },
      {
        path: 'business/:id',
        component: SupplierComponent
      },
      {
        path: 'business-info',
        component: SupplierAddInfoComponent,
        canActivate: [UsersCheck]
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [CustomerCheck]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [CustomerCheck]
      },
      {
        path: 'list-orders',
        component: SupplierOrdersComponent,
        canActivate: [UsersCheck]
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [UsersCheck]
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
        canActivate: [UsersCheck]
      },
      {
        path: 'reports',
        component: ShopReportsComponent,
        canActivate: [UsersCheck]
      },
      // {
      //   path: 'search/:text',
      //   component: ProductListComponent
      // },
      {
        path: 'products/:id',
        component: ProductListComponent
      },
      {
        path: 'search',
        component: BrowseListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRouting {}
