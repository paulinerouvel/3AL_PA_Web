import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorConnection : string = "";
  userModel : Utilisateur = new Utilisateur(-1,"","","","","", "", "", "", "", "", "","", 0, 0, "", "", "", 0);

  constructor(private _authService : AuthentificationService) { }


  ngOnInit() {
  }


  onSubmit(){
    console.log(this.userModel);
    this._authService.login(this.userModel).subscribe(res=>{
      console.log("co")
    }, err=>{
      this.errorConnection = "Identifiants incorrects !"
    });

  }

}
