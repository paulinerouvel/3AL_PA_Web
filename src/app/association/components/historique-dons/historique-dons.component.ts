import { Component, OnInit } from '@angular/core';
import { DonService } from 'src/app/core/services/don.service';
import { Don } from 'src/app/core/models/don';
import * as jwt_decode from 'jwt-decode';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-historique-dons',
  templateUrl: './historique-dons.component.html',
  styleUrls: ['./historique-dons.component.css']
})
export class HistoriqueDonsComponent implements OnInit {

  dons ;

  constructor(private _donService : DonService, private _storageService : StorageService, private _userService : UserService) { }

  async ngOnInit() {

    let token = this._storageService.getItem('token');

    let token_decoded = jwt_decode(token);
    this.dons = await this._donService.getAllDonByIdReceveur(token_decoded['id']).toPromise();


    this.dons.forEach(async element => {
      let donneur = await this._userService.getUserById(element.Donneur_id).toPromise();
      
      element.donneur = donneur.nom + " " + donneur.prenom;
      
    });



  }

}
