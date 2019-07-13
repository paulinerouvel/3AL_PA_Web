import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service';

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


  //Pour la dropdown

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(private authentificationService: AuthentificationService, private router: Router, private _userService: UserService) { }

  async ngOnInit() {


    let categories = await this._userService.getAllCategoryAssociation().toPromise();

    categories.forEach(ca => {
      this.dropdownList.push({ item_id: ca.id, item_text: ca.libelle })
    });


    /* this.dropdownList = [
       { item_id: 1, item_text: 'Mumbai' },
       { item_id: 2, item_text: 'Bangaluru' },
       { item_id: 3, item_text: 'Pune' },
       { item_id: 4, item_text: 'Navsari' },
       { item_id: 5, item_text: 'New Delhi' }
     ];*/
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Séléctionner tout',
      unSelectAllText: 'Déséléctionner tout',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
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
    let res = await this.authentificationService.register(this.userModel).toPromise();

    if (res == null) {
      let userInscrit: Utilisateur = await this._userService.getUserByEmail(this.userModel.mail).toPromise();
      await this._userService.addUserCategory(userInscrit.id.toString(), "1").toPromise();

      for (const item of this.selectedItems) {

        await this._userService.addCategoryAssociation(item.item_id, userInscrit.id).toPromise();
      }




      this.errorMsg = "";
      this.infoMsg = "Vous êtes désormais inscrit ! Connectez vous !";
      window.scrollTo(0, 0);
    }
    else {
      this.errorMsg = "L'inscription n'a pas fonctionné, une association existe déjà avec ses informations !";
      window.scrollTo(0, 0);
    }

  }


  onItemSelect(elem) {
    console.log(this.selectedItems);
  }

  onDeSelect(elem) {
    console.log(this.selectedItems);
  }

  onSelectAll(elem) {
    console.log(this.selectedItems);

  }






}
