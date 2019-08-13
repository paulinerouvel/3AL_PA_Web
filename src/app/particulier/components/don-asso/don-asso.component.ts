import { Component, OnInit } from '@angular/core';
import { Don } from 'src/app/core/models/don';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { DonService } from 'src/app/core/services/don.service';
import { UserService } from 'src/app/core/services/user.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';

@Component({
  selector: 'app-don-asso',
  templateUrl: './don-asso.component.html',
  styleUrls: ['./don-asso.component.css']
})
export class DonAssoComponent implements OnInit {

  constructor(private _aRoute : ActivatedRoute, private _storageService : StorageService, private _donService : DonService, 
    private _userService : UserService) { }
  don = new Don(0, "", 0, "", 0, 0);

  ngOnInit() {

    console.log(this._aRoute.snapshot.params.idAsso);

  }

  async onSubmit(){
    console.log(this.don)
    let token = this._storageService.getItem('token');

    let userId = this._userService.decodeTokenId(token);

    let date = new Date(Date.now());

    this.don.donneur_id = userId;
    this.don.receveur_id = this._aRoute.snapshot.params.idAsso;
    this.don.type = "Argent";
    this.don.date = date.toISOString();


    await this._donService.addDon(this.don).toPromise();

    let curUser : Utilisateur= await this._userService.getUserById(userId).toPromise();

    let ptsSourires = Math.trunc(this.don.montant) *2;

    curUser.nbPointsSourire += ptsSourires;
    
    await this._userService.updateUser(curUser).toPromise();



  }

}
