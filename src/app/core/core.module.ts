import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AssociationsPartenairesComponent } from './components/associations-partenaires/associations-partenaires.component';
import { EntreprisesPartenairesComponent } from './components/entreprises-partenaires/entreprises-partenaires.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  declarations: [LoginComponent, AssociationsPartenairesComponent, EntreprisesPartenairesComponent, BoutiqueComponent, ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule
  ]
})
export class CoreModule { }