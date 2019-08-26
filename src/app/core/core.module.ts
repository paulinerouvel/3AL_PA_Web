import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AssociationsPartenairesComponent } from './components/associations-partenaires/associations-partenaires.component';
import { EntreprisesPartenairesComponent } from './components/entreprises-partenaires/entreprises-partenaires.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailProduitComponent } from './components/detail-produit/detail-produit.component';
import { ConvertYesOrNoPipe } from './pipes/convert-yes-or-no.pipe';


@NgModule({
  declarations: [
    LoginComponent, 
    HomeComponent,
    PageNotFoundComponent,
    AssociationsPartenairesComponent, 
    EntreprisesPartenairesComponent,
    BoutiqueComponent, 
    DetailProduitComponent,
    ContactComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,                               
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    Ng5SliderModule,
    NgbModule
  ]
})
export class CoreModule { }