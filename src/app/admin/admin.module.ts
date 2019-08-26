import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { AccueilComponent } from './components/accueil/accueil.component';

@NgModule({
  declarations: [AccueilComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    Ng5SliderModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
