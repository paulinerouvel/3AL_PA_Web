import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Mail } from '../models/mail';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private _url: string = environment.UrlAPI + "/mail";

  constructor(private http: HttpClient) { }

  
  /**************************************************/
  /*                 ADD METHOD                     */
  /**************************************************/

  sendMail(mail: Mail) {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    return this.http.post<any>(this._url, mail, { headers: reqHeader }).pipe(catchError(this.handleError));

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
