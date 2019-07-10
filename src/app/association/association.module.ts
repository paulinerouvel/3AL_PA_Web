import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueAssoComponent } from './components/boutique-asso/boutique-asso.component';
import { AssociationRoutingModule } from './association-routing.module';
import { ModifProfilComponent } from './components/modif-profil/modif-profil.component';

@NgModule({
  declarations: [ BoutiqueAssoComponent, ModifProfilComponent],
  imports: [
    CommonModule,
    AssociationRoutingModule
  ]
})
export class AssociationModule { }
