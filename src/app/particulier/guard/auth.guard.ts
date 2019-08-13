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
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let data = this._storageService.getItem("token");

    if (data != undefined) {
      if (this.userService.decodeTokenType(data) == 3) {
        return true;
      }
    }

    this._router.navigateByUrl('/home');
    return false;
  }
}