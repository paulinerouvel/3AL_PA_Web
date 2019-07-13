import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BoutiquePartiComponent } from './components/boutique-parti/boutique-parti.component';
import { ModifProfilComponent } from './components/modif-profil/modif-profil.component';
import { GestionAlertesComponent } from './components/gestion-alertes/gestion-alertes.component';
import { AddAlerteComponent } from './components/add-alerte/add-alerte.component';
import { HistoriqueCommandesComponent } from './components/historique-commandes/historique-commandes.component';
import { HistoriqueDonsComponent } from './components/historique-dons/historique-dons.component';
import { MonPanierPartComponent } from './components/mon-panier-part/mon-panier-part.component';
import { PaiementComponent } from './components/paiement/paiement.component';


const partRoutes: Routes = [
  { path: 'boutique-part',  component: BoutiquePartiComponent, canActivate : [AuthGuard]},
  { path: 'modif-profil-part',  component: ModifProfilComponent, canActivate : [AuthGuard]},
  { path: 'gestion-alertes-part',  component: GestionAlertesComponent, canActivate : [AuthGuard]},
  { path: 'gestion-alertes-part/add',  component: AddAlerteComponent, canActivate : [AuthGuard]},
  { path: 'dons-part',  component: HistoriqueDonsComponent, canActivate : [AuthGuard]},
  { path: 'commandes-part',  component: HistoriqueCommandesComponent, canActivate : [AuthGuard]},
  { path: 'panier-part',  component: MonPanierPartComponent, canActivate : [AuthGuard]},
  { path: 'paiement',  component: PaiementComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(partRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ParticulierRoutingModule { }