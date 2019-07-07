import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AssociationsPartenairesComponent } from './components/associations-partenaires/associations-partenaires.component';
import { EntreprisesPartenairesComponent } from './components/entreprises-partenaires/entreprises-partenaires.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { DetailAssociationComponent } from './components/detail-association/detail-association.component';


@NgModule({
  declarations: [LoginComponent, AssociationsPartenairesComponent, EntreprisesPartenairesComponent, BoutiqueComponent, DetailAssociationComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }