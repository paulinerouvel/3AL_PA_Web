import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public userModel : Utilisateur = new Utilisateur(-1, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", 0);
  private userType : Number= 3;
  public errorMsg : string = "";
  public infoMsg : string = "";

  constructor(private authentificationService: AuthentificationService, private userService: UserService) { }

  ngOnInit() {
  }

  changeUserType(type : number){
    this.userType = type;
  }



  async onSubmitNoName(){

    


    let res = await this.authentificationService.register(this.userModel).toPromise();

    if (res == null) {
      let userInscrit : Utilisateur = await this.userService.getUserByEmail(this.userModel.mail).toPromise();
      this.userService.addUserCategory(userInscrit.id.toString(), this.userType.toString()).toPromise();

      this.errorMsg = "";

      this.infoMsg = "Utilisateur Ajouté !";
      location.replace('/gestion-user');
    }
    else {
      this.errorMsg = "L'ajout n'a pas fonctionné, un utilisateur existe déjà avec ses informations !";
      
    }

  }

  async onSubmitWithName(){
    let res = await this.authentificationService.register(this.userModel).toPromise();

    if (res == null) {
      let userInscrit : Utilisateur = await this.userService.getUserByEmail(this.userModel.mail).toPromise();
      this.userService.addUserCategory(userInscrit.id.toString(), this.userType.toString()).toPromise();

      this.errorMsg = "";

      this.infoMsg = "Utilisateur Ajouté !";
      
    }
    else {
      this.errorMsg = "L'ajout n'a pas fonctionné, un utilisateur existe déjà avec ses informations !";
      location.replace('/gestion-user');
    }
  }
}
