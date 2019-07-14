import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiquePartiComponent } from './components/boutique-parti/boutique-parti.component';
import { ParticulierRoutingModule } from './particulier-routing.module';
import { ModifProfilComponent } from './components/modif-profil/modif-profil.component';
import { HistoriqueCommandesComponent } from './components/historique-commandes/historique-commandes.component';
import { HistoriqueDonsComponent } from './components/historique-dons/historique-dons.component';
import { GestionAlertesComponent } from './components/gestion-alertes/gestion-alertes.component';
import { AddAlerteComponent } from './components/add-alerte/add-alerte.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MonPanierPartComponent } from './components/mon-panier-part/mon-panier-part.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { Ng5SliderModule } from 'ng5-slider';
import { DonAssoComponent } from './components/don-asso/don-asso.component';

@NgModule({
  declarations: [BoutiquePartiComponent, ModifProfilComponent, HistoriqueCommandesComponent, HistoriqueDonsComponent, GestionAlertesComponent, AddAlerteComponent, MonPanierPartComponent, PaiementComponent, DonAssoComponent],
  imports: [
    CommonModule,
    ParticulierRoutingModule,
    FormsModule,
    FontAwesomeModule,
    Ng5SliderModule
  ]
})
export class ParticulierModule { }
