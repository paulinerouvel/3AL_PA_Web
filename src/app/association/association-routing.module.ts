import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BoutiqueAssoComponent } from './components/boutique-asso/boutique-asso.component';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';
import { ModifProfilComponent } from './components/modif-profil/modif-profil.component';
import { GestionAlertesComponent } from './components/gestion-alertes/gestion-alertes.component';
import { AddAlerteComponent } from './components/add-alerte/add-alerte.component';
import { HistoriqueDonsComponent } from './components/historique-dons/historique-dons.component';
import { HistoriqueCommandesComponent } from './components/historique-commandes/historique-commandes.component';
import { MonPanierAssoComponent } from './components/mon-panier-asso/mon-panier-asso.component';


const assoRoutes: Routes = [
  { path: 'boutique-asso',  component: BoutiqueAssoComponent, canActivate : [AuthGuard]},
  { path: 'modif-profil-asso',  component: ModifProfilComponent, canActivate : [AuthGuard]},
  { path: 'gestion-alertes-asso',  component: GestionAlertesComponent, canActivate : [AuthGuard]},
  { path: 'gestion-alertes-asso/add',  component: AddAlerteComponent, canActivate : [AuthGuard]},
  { path: 'dons-asso',  component: HistoriqueDonsComponent, canActivate : [AuthGuard]},
  { path: 'commandes-asso',  component: HistoriqueCommandesComponent, canActivate : [AuthGuard]},
  { path: 'panier-asso',  component: MonPanierAssoComponent, canActivate : [AuthGuard]}
 // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(assoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AssociationRoutingModule { }