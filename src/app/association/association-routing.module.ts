import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BoutiqueAssoComponent } from './components/boutique-asso/boutique-asso.component';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';


const assoRoutes: Routes = [
  { path: 'boutique-asso',  component: BoutiqueAssoComponent, canActivate : [AuthGuard]}//,
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