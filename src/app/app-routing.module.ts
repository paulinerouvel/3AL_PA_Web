import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { AssociationsPartenairesComponent } from './core/components/associations-partenaires/associations-partenaires.component';
import { EntreprisesPartenairesComponent } from './core/components/entreprises-partenaires/entreprises-partenaires.component';
import { BoutiqueComponent } from './core/components/boutique/boutique.component';
import { DetailAssociationComponent } from './core/components/detail-association/detail-association.component';
import { ContactComponent } from './core/components/contact/contact.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"associationsPartenaires", component: AssociationsPartenairesComponent},
  {path:"detailAssociation/:id", component: DetailAssociationComponent},
  {path:"entreprisesPartenaires", component: EntreprisesPartenairesComponent},
  {path:"boutique", component: BoutiqueComponent},
  {path:"contact", component: ContactComponent},
  {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
