import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';

import { Icons } from './components/icons';
import { Services } from './services';
import { Modals } from './components/modals';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { UpSearchComponent } from './components/up-search/up-search.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    ...Icons,
    FooterComponent,
    ...Modals,
    UpSearchComponent
  ],
  exports: [HeaderComponent, ...Icons, FooterComponent, UpSearchComponent],
  providers: [...Services],
  entryComponents: [...Modals]
})
export class SharedModule {}
