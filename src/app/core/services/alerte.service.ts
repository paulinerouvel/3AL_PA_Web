import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Alert } from 'selenium-webdriver';
import { catchError } from 'rxjs/operators';
import { Alerte } from '../models/alerte';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  constructor(private http: HttpClient) { }

  private _url: string = environment.UrlAPI + "/alert";



  addAlert(alert: Alerte) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    return this.http.post<Alerte>(this._url, alert, { headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getAllAlertByUserId(id: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('id', id);


    return this.http.get<Alerte[]>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));
  }


  deleteAlertById(id: string) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('id', id);


    return this.http.delete<Alert[]>(this._url, { params: params, headers: reqHeader }).pipe(catchError(this.handleError));

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
