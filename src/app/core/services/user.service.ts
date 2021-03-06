import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { catchError } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storageService : StorageService) { }


  private _url: string = environment.UrlAPI + "/user";


  addUserCategory(id: string, category: string) {

    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    return this.http.post<any>(this._url + '/category', { "categoryUserId": category, "userId": id }, { headers: reqHeader }).pipe(catchError(this.handleError));
  }



  getUserById(id: string): Observable<Utilisateur> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Utilisateur>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getUserByEmail(mail: string): Observable<Utilisateur> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    let params = new HttpParams();
    params = params.append('mail', mail);
    return this.http.get<Utilisateur>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }


  getCategoryOfUser(userId:string){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('userId', userId);

    return this.http.get<any>(this._url + "/category", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }


  getUsersByCategory(category: string): Observable<Utilisateur> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('type', category);
    return this.http.get<Utilisateur>(this._url + "/allByCategory", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }


  getCategoryById(id : string){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('catId', id);
    return this.http.get<any>(this._url + "/category", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getValidUsersByCategory(category: string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('type', category);
    return this.http.get<any>(this._url + "/allValidByCategory", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<Utilisateur[]> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    return this.http.get<Utilisateur[]>(this._url , {  headers: reqHeader }).pipe(catchError(this.handleError));
  }


  getAllCategory(){

    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    return this.http.get<any>(this._url + "/categories" , {  headers: reqHeader }).pipe(catchError(this.handleError));
  }


  updateUser(user: Utilisateur, token : string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.put<any>(this._url, user, { headers: reqHeader }).pipe(catchError(this.handleError));

  }

  deleteUser(id : string, token : string){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });


    return this.http.delete(this._url + '/' +  id,  {  headers: reqHeader }).pipe(catchError(this.handleError));

  }

  verifyTokenValidity(token : string) : Boolean{
    let token_decoded = jwt_decode(token);


    let exp = token_decoded['exp'];
    let iat = token_decoded['iat'];

    let now = parseInt(Date.now().toString().substring(0, 10));

    if(now > exp){

      //le token a expiré => deconnextion + redirection vers la page d'accueil
      this.storageService.removeItem('token');
      return false;
    }

    return true;

  }

  decodeTokenId(token : string){

    let token_decoded = jwt_decode(token);
    return token_decoded['id'];

  }

  decodeTokenType(token : string){
    let token_decoded = jwt_decode(token);
    return token_decoded['type'].Categorie_utilisateur_id;
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
