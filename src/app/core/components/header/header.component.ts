import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Observable, Subject } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import * as jwt_decode from 'jwt-decode';
import { Utilisateur } from '../../models/utilisateur';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShown:boolean = false;
  isConnected = false;
  type;
  curUser : Utilisateur = new Utilisateur(0, "", "", "","", "", "", "", "","", "","", "", 0, 0, "", "", "", 0);
  
  constructor(private _storageService : StorageService, private _userService : UserService, private _cookieService: CookieService
    , private _router : Router) { 
    
  }

  async ngOnInit() {

    let token = this._storageService.getItem('token');
    if(token != undefined){
      this.isConnected = true;
      let token_decoded = jwt_decode(token);
      this.type = token_decoded['type'];
      this.curUser = await this._userService.getUserById(token_decoded["id"]).toPromise();
    }


    //regarde si le localStorage change pour le token 
    this._storageService.watchStorage().subscribe(async (data:string) => {

      if(data != "remove"){
        this.isConnected = true;
        let token_decoded = jwt_decode(data);
        this.type = token_decoded['type'];
        this.curUser = await this._userService.getUserById(token_decoded["id"]).toPromise();
      }
      else{
        this.isConnected= false;
        this.curUser = undefined;
      }

    });

  } 


  deconnexion(){
    this._storageService.removeItem("token");
    this._cookieService.delete('produitPanier');
    this._router.navigateByUrl('/home');
  }


}
