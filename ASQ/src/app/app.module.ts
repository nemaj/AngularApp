import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedModule } from '@shared/shared.module';
import { AppLoadService } from '@shared/services/app-load.service';

import { ToastrModule } from 'ngx-toastr';

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: init_app,
    //   deps: [AppLoadService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
