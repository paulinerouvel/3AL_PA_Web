import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouterLinkActive, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanActivate } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private _storageService : StorageService, private _router : Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let data = this._storageService.getItem("token");

    if(data != undefined){
      let token_decoded = jwt_decode(data);
      if(token_decoded["type"] == 1){
        return true;
      }
    }
    
    this._router.navigateByUrl('/home');
    return false;
    


  }

}