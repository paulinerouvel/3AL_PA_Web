import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { AccueilComponent } from './components/accueil/accueil.component';
import { GestionProduitComponent } from './components/gestion-produit/gestion-produit.component';
import { GestionUserComponent } from './components/gestion-user/gestion-user.component';
import { ModifProduitComponent } from './components/modif-produit/modif-produit.component';
import { ModifUserComponent } from './components/modif-user/modif-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { ConvertYesOrNoPipe } from '../core/pipes/convert-yes-or-no.pipe';

@NgModule({
  declarations: [AccueilComponent, GestionProduitComponent, GestionUserComponent, ModifProduitComponent, ModifUserComponent, AddUserComponent, AddProduitComponent, ConvertYesOrNoPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    Ng5SliderModule,
    ReactiveFormsModule
    
  ]
})
export class AdminModule { }
