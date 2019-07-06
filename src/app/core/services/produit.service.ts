import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { catchError } from 'rxjs/operators';
import { Produit } from '../models/produit';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  

  constructor(private http : HttpClient) { }


  
  private _url: string = environment.UrlAPI + "/product";


  getProductById(id) : Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });
   let params = new HttpParams();
   params = params.append('id', id);
   return this.http.get<Produit>(this._url + "/", {params : params, headers : reqHeader} ).pipe(catchError( this.handleError));
  }
  
  getAllProductEnRayon() : Observable<any>{
    let reqHeader = new HttpHeaders({ 
      'accept': 'application/json',
      'content-type': 'application/json'
   });

    return this.http.get<Produit>(this._url + "/enRayon", {headers : reqHeader} ).pipe(catchError( this.handleError));
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
