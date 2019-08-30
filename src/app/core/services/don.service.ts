import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Don } from '../models/don';

@Injectable({
  providedIn: 'root'
})
export class DonService {


  private _url: string = environment.UrlAPI + "/donation";


  constructor(private http: HttpClient) { }

  /**************************************************/
  /*                 ADD METHOD                     */
  /**************************************************/


  addDon(don : Don, token : string){
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });



    return this.http.post<any>(this._url, don, {  headers: reqHeader }).pipe(catchError(this.handleError));
  }

  sendMailAndFacture(idDon : string, token : string) {

    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });



    return this.http.post<any>(this._url,JSON.stringify({
      "idDon": idDon}) ,{headers: reqHeader }).pipe(catchError(this.handleError));

  }


  /**************************************************/
  /*                 GET METHOD                     */
  /**************************************************/

  getAllDonByIdReceveur(idR: string, token : string) : Observable<Don[]> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    let params = new HttpParams();
    params = params.append('idR', idR);


    return this.http.get<Don[]>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getAllDonByIdDonneur(idD: string, token :string) : Observable<Don[]>{
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    let params = new HttpParams();
    params = params.append('idD', idD);


    return this.http.get<Don[]>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

  }



  getLastDonByIdDonneur(idD: string, token : string)  {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    let params = new HttpParams();
    params = params.append('idD', idD);


    return this.http.get<any>(this._url + "/last", { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

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
