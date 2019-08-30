import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig] 
})
export class HomeComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;



  errorMsg = '';
  infoMsg = '';
  submitted = false;
  userType = "particulier"
  userModel = new Utilisateur(-1, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", 0);




  constructor(private authentificationService: AuthentificationService, private _userService: UserService,
    private storageService : StorageService, config: NgbCarouselConfig) { 
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
    }



  async ngOnInit() {
    this.userModel.photo = "img_profil.png";


    let token = await this.storageService.getItem('token');

    if(token != undefined){
      let valid = this._userService.verifyTokenValidity(token);
      if(valid == false){
        location.reload();
      }

    }

    
  }


  switchUser() {
    if (this.userType == "particulier") {
      this.userType = "association";
    }
    else {
      this.userType = "particulier";
    }
  }


  async onSubmitParticulier() {

    //l'utilisateur est valide car un particulier n'a pas besoin de faire valider son profil
    this.userModel.estValide = 1;

    
    this.userModel.libelle = "";
    this.userModel.siret = "";
    this.userModel.tailleOrganisme = 0;
    this.userModel.desc = "";



    let res = await this.authentificationService.register(this.userModel).toPromise();

    if (res == null) {
      let userInscrit: Utilisateur = await this._userService.getUserByEmail(this.userModel.mail).toPromise();
      this._userService.addUserCategory(userInscrit.id.toString(), "3").toPromise();

      this.errorMsg = "";

      this.infoMsg = "Vous êtes désormais inscrit ! Connectez vous !";
      window.scrollTo(0, 0);
    }
    else {
      this.errorMsg = "L'inscription n'a pas fonctionné, un utilisateur existe déjà avec ses informations !";
      window.scrollTo(0, 0);
    }



  }

  async onSubmitAsso() {


    this.userModel.nom = "";
    this.userModel.prenom = "";

    let res = await this.authentificationService.register(this.userModel).toPromise();

    if (res == null) {
      let userInscrit: Utilisateur = await this._userService.getUserByEmail(this.userModel.mail).toPromise();
      await this._userService.addUserCategory(userInscrit.id.toString(), "1").toPromise();


      this.errorMsg = "";
      this.infoMsg = "Vous êtes désormais inscrit ! Votre compte devra être validé par un administrateur WasteMart avant qu'il soit valide."+
      "Vous recevrez un mail lorsque la validation aura été effectuée !";
      window.scrollTo(0, 0);
    }
    else {
      this.errorMsg = "L'inscription n'a pas fonctionné, une association existe déjà avec ses informations !";
      window.scrollTo(0, 0);
    }
  }
}
