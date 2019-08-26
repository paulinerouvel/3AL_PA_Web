import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AccueilComponent } from './components/accueil/accueil.component';
import { GestionProduitComponent } from './components/gestion-produit/gestion-produit.component';
import { GestionUserComponent } from './components/gestion-user/gestion-user.component';
import { ModifProduitComponent } from './components/modif-produit/modif-produit.component';
import { ModifUserComponent } from './components/modif-user/modif-user.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { AddUserComponent } from './components/add-user/add-user.component';


const adminRoutes: Routes = [
   { path: 'accueil-admin',  component: AccueilComponent, canActivate : [AuthGuard]},
   { path: 'gestion-produit',  component: GestionProduitComponent, canActivate : [AuthGuard]},
   { path: 'gestion-user',  component: GestionUserComponent, canActivate : [AuthGuard]},
   { path: 'modif-produit',  component: ModifProduitComponent, canActivate : [AuthGuard]},
   { path: 'modif-user',  component: ModifUserComponent, canActivate : [AuthGuard]},
   { path: 'add-produit',  component: AddProduitComponent, canActivate : [AuthGuard]},
   { path: 'add-user',  component: AddUserComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }