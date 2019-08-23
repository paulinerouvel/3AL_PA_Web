import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueAssoComponent } from './components/boutique-asso/boutique-asso.component';
import { AssociationRoutingModule } from './association-routing.module';
import { ModifProfilComponent } from './components/modif-profil/modif-profil.component';
import { HistoriqueCommandesComponent } from './components/historique-commandes/historique-commandes.component';
import { HistoriqueDonsComponent } from './components/historique-dons/historique-dons.component';
import { GestionAlertesComponent } from './components/gestion-alertes/gestion-alertes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAlerteComponent } from './components/add-alerte/add-alerte.component';
import { MonPanierAssoComponent } from './components/mon-panier-asso/mon-panier-asso.component';
import { CommandeComponent } from './components/commande/commande.component';
import { ModifPhotoComponent } from './components/modif-photo/modif-photo.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [BoutiqueAssoComponent, ModifProfilComponent, HistoriqueCommandesComponent, HistoriqueDonsComponent, GestionAlertesComponent, AddAlerteComponent, MonPanierAssoComponent, CommandeComponent, ModifPhotoComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssociationRoutingModule,
    ReactiveFormsModule,
    Ng5SliderModule
  ]
})
export class AssociationModule { }
