import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Alerte } from '../models/alerte';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  constructor(private http: HttpClient) { }

  private _url: string = environment.UrlAPI + "/alert";


  /**************************************************/
  /*                 ADD METHOD                     */
  /**************************************************/


  addAlert(alert: Alerte, token : string)  {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post<any>(this._url, alert, { headers: reqHeader }).pipe(catchError(this.handleError));

  }

  
  /**************************************************/
  /*                 GET METHOD                     */
  /**************************************************/

  getAllAlertByUserId(id: string, token : string): Observable<Alerte[]> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    let params = new HttpParams();
    params = params.append('id', id);


    return this.http.get<Alerte[]>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }



  
  /**************************************************/
  /*              DELETE METHOD                     */
  /**************************************************/

  deleteAlertById(id: string, token : string)  {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    let params = new HttpParams();
    params = params.append('id', id);


    return this.http.delete(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

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
