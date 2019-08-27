import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AuthentificationService } from '../../services/authentification.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorConnection: string = "";
  userModel: Utilisateur = new Utilisateur(-1, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", 0);

  constructor(private _authService: AuthentificationService, private storageService : StorageService, 
    private userService : UserService, private _router: Router) { }



  ngOnInit() {
  }


  onSubmit() {
    this._authService.login(this.userModel).subscribe(res => {

      let type = this.userService.decodeTokenType(res.token)

      if (type == 1 || type == 3 || type == 5) {

        this.storageService.setItem("token", res.token);
        if (type == 1) {
          //compte asso
          this._router.navigateByUrl('/boutique-asso');
        }
        else if (type == 3) {
          //compte particulier
          this._router.navigateByUrl('/boutique-part');
        }
        else if (type == 5 ){
          //compte admin
          this._router.navigateByUrl('/accueil-admin');
        }
        else {
          this._router.navigateByUrl('/boutique');
        }
      }
      else {
        this.errorConnection = "Vous n'êtes pas autorisé à accéder au site car vous avez un compte professionnel ou employé."
      }


    }, err => {
      this.errorConnection = "Identifiants incorrects !"
    });

  }

}
