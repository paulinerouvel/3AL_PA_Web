import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }


  private _url: string = environment.UrlAPI + "/user";


  addUserCategory(id : string, category : string) : Observable<any>{

    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });
   return this.http.post<any>(this._url + '/category', {"categoryUserId" : category, "userId": id} , { headers : reqHeader} ).pipe(catchError( this.handleError));
  }


  addCategoryAssociation(CategorieAssociation_id, Utilisateur_id) : Observable<any>{

    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });



   return this.http.post<any>(this._url + '/categorieAssociation', {"CategorieAssociation_id" : CategorieAssociation_id, "Utilisateur_id": Utilisateur_id},  { headers : reqHeader} ).pipe(catchError( this.handleError));
  
  }



  getUserById(id : string) : Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });
   let params = new HttpParams();
   params = params.append('id', id);
   return this.http.get<Utilisateur>(this._url, {params : params, headers : reqHeader} ).pipe(catchError( this.handleError));

  }

  getUserByEmail(mail : string) : Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });
   let params = new HttpParams();
   params = params.append('mail', mail);
   return this.http.get<Utilisateur>(this._url, {params : params, headers : reqHeader} ).pipe(catchError( this.handleError));

  }


  getUsersByCategory(category : string) : Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });

    let params = new HttpParams();
    params = params.append('type', category);
    return this.http.get<Utilisateur>(this._url + "/allByCategory", {params: params, headers : reqHeader} ).pipe(catchError( this.handleError));
  }

  getValidUsersByCategory(category : string) : Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });

    let params = new HttpParams();
    params = params.append('type', category);
    return this.http.get<Utilisateur>(this._url + "/allValidByCategory", {params: params, headers : reqHeader} ).pipe(catchError( this.handleError));
  }


  getAllCategoryAssociation(): Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });

    return this.http.get<Utilisateur>(this._url + "/categorieAssociation", { headers : reqHeader} ).pipe(catchError( this.handleError));
  }

  updateUser(user : Utilisateur) : Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    return this.http.put<any>(this._url , user , { headers : reqHeader} ).pipe(catchError( this.handleError));
  
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'The connection to API failed.');
  };
}
