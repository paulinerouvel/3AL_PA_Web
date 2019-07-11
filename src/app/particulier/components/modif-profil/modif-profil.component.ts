import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import * as jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.component.html',
  styleUrls: ['./modif-profil.component.css']
})
export class ModifProfilComponent implements OnInit {

  userModel = new Utilisateur(0, "", "","","","","","","","","","","",0,0,"","","",0);

  constructor(private _userService : UserService, private _storageService : StorageService) { }

  async ngOnInit() {
    let data = this._storageService.getItem("token");
    let token_decoded = jwt_decode(data);

    this.userModel = await this._userService.getUserById(token_decoded['id']).toPromise();
    let date = new Date(this.userModel.dateDeNaissance);
    let d = date.toISOString().split('T');
    this.userModel.dateDeNaissance = d[0];
    this.userModel.mdp = "";
  }

  async onSubmit(){
    this._userService.updateUser(this.userModel).toPromise();
    location.reload();
  }

}
