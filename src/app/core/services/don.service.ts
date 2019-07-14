import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonService {


  private _url: string = environment.UrlAPI + "/donation";


  constructor(private http: HttpClient) { }


  addDon(don){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });



    return this.http.post<any>(this._url, don, {  headers: reqHeader }).pipe(catchError(this.handleError));
  }

  getAllDonByIdReceveur(idR: string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('idR', idR);


    return this.http.get<any>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getAllDonByIdDonneur(idD: string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('idD', idD);


    return this.http.get<any>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

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
