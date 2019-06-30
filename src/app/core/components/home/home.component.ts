import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMsg = '';
  infoMsg = '';
  submitted = false;
  userType = "particulier"
  userModel = new Utilisateur(-1, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", "", 0);




  constructor(private authentificationService: AuthentificationService, private router: Router) { }

  ngOnInit() {
  }


  switchUser() {
    if (this.userType == "particulier") {
      this.userType = "association";
    }
    else {
      this.userType = "particulier";
    }
  }


  onSubmitParticulier() {

    //l'utilisateur est valide car un particulier n'a pas besoin de faire valider son profil
    this.userModel.estValide = 1;



    this.authentificationService.register(this.userModel)
      .subscribe(
        res => {
          this.infoMsg = "Vous êtes désormais inscrit ! Connectez vous !";
          window.scrollTo(0, 0);

        },
        err => {
          this.errorMsg = "L'inscription n'a pas fonctionné, un utilisateur existe déjà avec ses informations !";
          window.scrollTo(0, 0);
        }
      );
  }

  onSubmitAsso(){
    this.authentificationService.register(this.userModel)
    .subscribe(
      res => {
        this.infoMsg = "Vous êtes désormais inscrit ! Connectez vous !";
        window.scrollTo(0, 0);

      },
      err => {
        this.errorMsg = "L'inscription n'a pas fonctionné, une association existe déjà avec ses informations !";
        window.scrollTo(0, 0);
      }
    );
  }



}
