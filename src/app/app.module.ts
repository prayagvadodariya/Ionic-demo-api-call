import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Constant } from './services/constant';
import { ApiService } from './services/api.service';
import { WebServiceHandler } from './services/webServiceHandler';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ Constant,
              ApiService,
              GooglePlus,
              WebServiceHandler,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
