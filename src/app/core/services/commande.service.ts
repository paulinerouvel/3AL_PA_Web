import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Commande } from '../models/commande';
import { catchError } from 'rxjs/operators';
import { Commande_has_produit } from '../models/commande_has_produit';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private _url: string = environment.UrlAPI + "/order";

  constructor(private http: HttpClient) { }

  /**************************************************/
  /*                 ADD METHOD                     */
  /**************************************************/


  addCommande(commande: Commande, token : string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });



    return this.http.post<any>(this._url, commande, { headers: reqHeader }).pipe(catchError(this.handleError));

  }


  addProductInCommande(commande_has_produit : Commande_has_produit, token : string) {

    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });



    return this.http.post<any>(this._url, commande_has_produit, { headers: reqHeader }).pipe(catchError(this.handleError));

  }

  sendMailAndFacture(idCmd : string, token : string) {

    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });



    return this.http.post<any>(this._url,JSON.stringify({
      "idCmd": idCmd}) ,{headers: reqHeader }).pipe(catchError(this.handleError));

  }


  /**************************************************/
  /*                 GET METHOD                     */
  /**************************************************/

  getAllCommandeByIdUser(idUser: string, token : string) : Observable<Commande[]>{
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });


    let params = new HttpParams();
    params = params.append('idUser', idUser);


    return this.http.get<Commande[]>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getAllProductByOrder(idOrder : string, token : string) :Observable<Produit[]>{
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });


    let params = new HttpParams();
    params = params.append('idOrder', idOrder);


    return this.http.get<Produit[]>(this._url + "/products", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getSumOfProductsOrderByUserAndDate(dateDebut : string, dateFin : string, idUser :string, token : string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });


    let params = new HttpParams();
    params = params.append('dateDebut', dateDebut);
    params = params.append('dateFin', dateFin);
    params = params.append('idUser', idUser);


    return this.http.get<any>(this._url + "/products", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getLastOrderByIdUser(idUser : string, token : string) :Observable<Commande> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });


    let params = new HttpParams();
    params = params.append('idUser', idUser);


    return this.http.get<Commande>(this._url + "/last", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

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



