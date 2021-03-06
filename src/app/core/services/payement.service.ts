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

  /**************************************************/
  /*                 ADD METHOD                     */
  /**************************************************/

  addPayement(payement : Payement, token : string){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(this._url, payement, { headers: reqHeader }).pipe(catchError(this.handleError));
  }


  /**************************************************/
  /*                 GET METHOD                     */
  /**************************************************/
  getAllPayement(token : string): Observable<Payement[]> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<Payement[]>(this._url, { headers: reqHeader }).pipe(catchError(this.handleError));
  }


  public getFacture(factureName): Observable<Blob> {   
    let uri = environment.UrlFacture + "/" + factureName;
    
    return this.http.get(uri, { responseType: 'blob' });
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
