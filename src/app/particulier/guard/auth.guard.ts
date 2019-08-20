import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _storageService: StorageService, private _router: Router, private userService : UserService) {

  }
  canActivate() {

    let token = this._storageService.getItem("token");


    if (token != undefined) {


      if (this.userService.decodeTokenType(token) == 3 && this.userService.verifyTokenValidity(token)) {
        return true;
      }
    }

    this._router.navigateByUrl('/home');
    location.reload();
    return false;
  }
}