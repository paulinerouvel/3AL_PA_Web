import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { CanActivate } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _storageService: StorageService, private _router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let data = this._storageService.getItem("token");

    if (data != undefined) {
      let token_decoded = jwt_decode(data);
      if (token_decoded["type"] == 3) {
        return true;
      }
    }

    this._router.navigateByUrl('/home');
    return false;
  }
}