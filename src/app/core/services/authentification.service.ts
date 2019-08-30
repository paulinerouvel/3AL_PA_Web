import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }


  private _url: string = environment.UrlAPI + "/user";

  /**************************************************/
  /*                 ADD METHOD                     */
  /**************************************************/

  register(utilisateur: Utilisateur) {

    let reqHeader = new HttpHeaders({
      'Authorization': 'SECRET',
      'Accept': 'application/json',
      'Content-Type': 'application/json'

    });
    return this.http.post<any>(this._url + "/register", utilisateur, { headers: reqHeader }).pipe(catchError(this.handleError));
  }

  login(utilisateur: Utilisateur){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    return this.http.post<any>(this._url + "/login", utilisateur, { headers: reqHeader }).pipe(catchError(this.handleError));
  }




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'The connection to API failed.');
  };
}

