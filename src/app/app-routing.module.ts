import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { AssociationsPartenairesComponent } from './core/components/associations-partenaires/associations-partenaires.component';
import { EntreprisesPartenairesComponent } from './core/components/entreprises-partenaires/entreprises-partenaires.component';
import { BoutiqueComponent } from './core/components/boutique/boutique.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"associationsPartenaires", component: AssociationsPartenairesComponent},
  {path:"entreprisesPartenaires", component: EntreprisesPartenairesComponent},
  {path:"boutique", component: BoutiqueComponent},
  {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
