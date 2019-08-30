import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.component.html',
  styleUrls: ['./modif-profil.component.css']
})
export class ModifProfilComponent implements OnInit {

  userModel = new Utilisateur(0, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", 0);

  constructor(private _userService: UserService, private _storageService: StorageService) { }

  async ngOnInit() {
    let data = this._storageService.getItem("token");

    this.userModel = await this._userService.getUserById(this._userService.decodeTokenId(data)).toPromise();
    let date = new Date(this.userModel.dateDeNaissance);
    let d = date.toISOString().split('T');
    this.userModel.dateDeNaissance = d[0];
    this.userModel.mdp = "";
  }

  async onSubmit() {
    let token = this._storageService.getItem("token");
    this._userService.updateUser(this.userModel, token).toPromise();

    alert("Profil modifié !");
    location.replace('/boutique-part');
  }

}
