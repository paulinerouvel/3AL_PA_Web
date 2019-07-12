import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Commande } from '../models/commande';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private _url: string = environment.UrlAPI + "/order";

  constructor(private http: HttpClient) { }


  addCommande(commande: Commande) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });



    return this.http.post<any>(this._url, commande, { headers: reqHeader }).pipe(catchError(this.handleError));

  }


  addProductInCommande(commande_has_produit){

    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });



    return this.http.post<any>(this._url, commande_has_produit, { headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getAllCommandeByIdUser(idUser: string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    let params = new HttpParams();
    params = params.append('idUser', idUser);


    return this.http.get<any>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getAllProductByOrder(idOrder){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    let params = new HttpParams();
    params = params.append('idOrder', idOrder);


    return this.http.get<any>(this._url + "/products", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getSumOfProductsOrderByUserAndDate(dateDebut, dateFin, idUser) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    let params = new HttpParams();
    params = params.append('dateDebut', dateDebut);
    params = params.append('dateFin', dateFin);
    params = params.append('idUser', idUser);


    return this.http.get<any>(this._url + "/products", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getLastOrderByIdUser( idUser) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    let params = new HttpParams();
    params = params.append('idUser', idUser);


    return this.http.get<any>(this._url + "/last", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

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



