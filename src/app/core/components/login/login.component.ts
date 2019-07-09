import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AuthentificationService } from '../../services/authentification.service';
import { StorageService } from '../../services/storage.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorConnection: string = "";
  userModel: Utilisateur = new Utilisateur(-1, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", "", 0);

  constructor(private _authService: AuthentificationService, private _storageService : StorageService) { }



  ngOnInit() {
  }


  onSubmit() {
    this._authService.login(this.userModel).subscribe(res => {
      let token_decoded = jwt_decode(res.token);

      if(token_decoded["type"] == 1 || token_decoded["type"] == 3 || token_decoded["type"] == 4 || token_decoded["type"] == 5){

        this._storageService.setItem("token", res.token);
      }
      else{
        this.errorConnection = "Vous n'êtes pas autorisé à accéder au site car vous avez un compte professionnel "
      }


    }, err => {
      this.errorConnection = "Identifiants incorrects !"
    });

  }

}
