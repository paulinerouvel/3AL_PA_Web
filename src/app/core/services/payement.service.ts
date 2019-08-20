import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Payement } from '../models/payement';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  constructor(private http: HttpClient) { }

  private _url: string = environment.UrlAPI + "/payement";

  addPayement(payement, token): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<Payement>(this._url, payement, { headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getAllPayement(token): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<Payement[]>(this._url, { headers: reqHeader }).pipe(catchError(this.handleError));
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
