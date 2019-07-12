import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { HomeComponent } from './core/components/home/home.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AssociationsPartenairesComponent } from './core/components/associations-partenaires/associations-partenaires.component';
import { EntreprisesPartenairesComponent } from './core/components/entreprises-partenaires/entreprises-partenaires.component';
import { BoutiqueComponent } from './core/components/boutique/boutique.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { DetailAssociationComponent } from './core/components/detail-association/detail-association.component';

import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import localeFr from '@angular/common/locales/fr';
import { ContactComponent } from './core/components/contact/contact.component';
import { AssociationModule } from './association/association.module';
import { ParticulierModule } from './particulier/particulier.module';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    AssociationsPartenairesComponent,
    EntreprisesPartenairesComponent,
    BoutiqueComponent,
    FooterComponent,
    DetailAssociationComponent,
    ContactComponent
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
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [CookieService,
    {provide: LOCALE_ID, useValue: "fr-CA" } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
