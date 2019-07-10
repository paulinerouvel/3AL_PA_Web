import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BoutiquePartiComponent } from './components/boutique-parti/boutique-parti.component';


const partRoutes: Routes = [
  { path: 'boutique-part',  component: BoutiquePartiComponent, canActivate : [AuthGuard]}
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