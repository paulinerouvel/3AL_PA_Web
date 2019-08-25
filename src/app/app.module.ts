import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { AssociationModule } from './association/association.module';
import { ParticulierModule } from './particulier/particulier.module';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
     AppComponent,
    FooterComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AssociationModule,
    ParticulierModule,
    AppRoutingModule,
    FormsModule,                               
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    Ng5SliderModule,
    NgbModule,
    CoreModule
  ],
  providers: [CookieService,
    {provide: LOCALE_ID, useValue: "fr-CA" } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
