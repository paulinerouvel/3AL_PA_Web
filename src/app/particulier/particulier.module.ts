import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiquePartiComponent } from './components/boutique-parti/boutique-parti.component';
import { ParticulierRoutingModule } from './particulier-routing.module';

@NgModule({
  declarations: [BoutiquePartiComponent],
  imports: [
    CommonModule,
    ParticulierRoutingModule
  ]
})
export class ParticulierModule { }
