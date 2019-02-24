import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRouting } from './shop.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import {
  TypeaheadModule,
  ModalModule,
  RatingModule,
  CarouselModule
} from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { TimeAgoPipe } from 'time-ago-pipe';
import { ShopModals } from './components/modals';

import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomerAddInfoComponent } from './pages/customer-add-info/customer-add-info.component';
import { SupplierAddInfoComponent } from './pages/supplier-add-info/supplier-add-info.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductSuggestComponent } from './pages/product-suggest/product-suggest.component';

import { ImageCropperModule } from 'ngx-img-cropper';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SupplierOrdersComponent } from './pages/supplier-orders/supplier-orders.component';
import { BrowseListComponent } from './pages/browse-list/browse-list.component';
import { ShopReportsComponent } from './pages/shop-reports/shop-reports.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    SharedModule,
    ShopRouting,
    FormsModule,
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AngularFileUploaderModule,
    RatingModule.forRoot(),
    ImageCropperModule,
    CarouselModule
  ],
  declarations: [
    ShopComponent,
    HomeComponent,
    CustomerAddInfoComponent,
    SupplierAddInfoComponent,
    SupplierComponent,
    ...ShopModals,
    ProductDetailsComponent,
    ProductSuggestComponent,
    CartComponent,
    OrdersComponent,
    TimeAgoPipe,
    ChatComponent,
    ProductListComponent,
    SupplierOrdersComponent,
    BrowseListComponent,
    ShopReportsComponent,
    CustomerProfileComponent
  ],
  entryComponents: [...ShopModals]
})
export class ShopModule {}
