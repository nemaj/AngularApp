import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Services } from './services';
import { Pipes } from './pipes';
import { Modals } from './components/modals';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RatingComponent } from './components/rating/rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ...Pipes,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ...Modals,
    RatingComponent
  ],
  exports: [
    ...Pipes,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ...Modals,
    RatingComponent
  ],
  providers: [...Services],
  entryComponents: [...Modals]
})
export class SharedModule {}
