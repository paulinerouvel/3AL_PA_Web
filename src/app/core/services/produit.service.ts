import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produit } from '../models/produit';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  private _url: string = environment.UrlAPI + "/product";


  getProductById(id): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Produit>(this._url + "/", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getAllProductEnRayonByDest(dest): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('dest', dest);

    return this.http.get<Produit>(this._url + "/enRayon", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getAllProducts(): Observable<Produit[]> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    return this.http.get<Produit[]>(this._url, { headers: reqHeader }).pipe(catchError(this.handleError));
  }



  getProductByCategorieAndDest(idCategorie, dest): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('dest', dest);
    params = params.append('idCategorie', idCategorie);

    return this.http.get<Produit>(this._url + "/enRayon", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }

    

  getProductByNameAndDest(name, dest): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('dest', dest);
    params = params.append('name', name);

    return this.http.get<Produit>(this._url + "/enRayon", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }


     
  getProductByPrixAndDest(prixMin, prixMax, dest): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('dest', dest);
    params = params.append('prixMin', prixMin);
    params = params.append('prixMax', prixMax);

    return this.http.get<Produit>(this._url + "/enRayon", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }


  getCategoryById(id): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<any>(this._url + "/category", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }


  getAllProductsCategorie(){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    return this.http.get<any>(this._url + "/category", {  headers: reqHeader }).pipe(catchError(this.handleError));
  
  }


  updateProduct(produit, token): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });


    return this.http.put<Produit>(this._url, produit, { headers: reqHeader }).pipe(catchError(this.handleError));

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
