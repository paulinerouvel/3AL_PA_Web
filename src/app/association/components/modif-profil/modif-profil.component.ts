import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { UserService } from 'src/app/core/services/user.service';
import * as jwt_decode from 'jwt-decode';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.component.html',
  styleUrls: ['./modif-profil.component.css']
})
export class ModifProfilComponent implements OnInit {

  userModel: Utilisateur = new Utilisateur(0, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", "", 0);

  constructor(private _storageService: StorageService, private _userService: UserService) { }

  async ngOnInit() {
    let data = this._storageService.getItem("token");
    let token_decoded = jwt_decode(data);
    this.userModel = await this._userService.getUserById(token_decoded['id']).toPromise();

  }

  onSubmit() {

    this._userService.updateUser(this.userModel).toPromise();
    window.location.reload();
  }

}
