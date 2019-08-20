import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {

  private _url: string = environment.UrlAPI + "/warehouse";

  constructor(private http: HttpClient) { }

  getAllEntrepot() {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    return this.http.get<any>(this._url, { headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getCoordArdress(adresse, ville, cp){
    let url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&country=France&city="+ ville + "&street=" + adresse;
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    return this.http.get<any>(url, { headers: reqHeader }).pipe(catchError(this.handleError));
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
