import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthentificationService } from '../core/services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public token: string = localStorage.getItem('token');
  constructor(private router: Router, private _userService: AuthentificationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.token) {
      return true;
    }

    this.router.navigate['/login'];
    return false;

  }


}
