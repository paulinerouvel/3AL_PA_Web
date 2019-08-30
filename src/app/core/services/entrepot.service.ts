import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Entrepot } from '../models/entrepot';

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {

  private _url: string = environment.UrlAPI + "/warehouse";

  constructor(private http: HttpClient) { }

  /**************************************************/
  /*                 GET METHOD                     */
  /**************************************************/

  getAllEntrepot() :Observable<Entrepot[]>{
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });


    return this.http.get<Entrepot[]>(this._url, { headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getEntrepotById(id : string) : Observable<Entrepot> {
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });

    let params = new HttpParams();
    params = params.append('id', id);


    return this.http.get<Entrepot>(this._url, { params:params, headers: reqHeader }).pipe(catchError(this.handleError));

  }

  getCoordArdress(adresse : string, ville : string, cp : string){
    let url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&country=France&city="+ ville + "&street=" + adresse;
    let reqHeader = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    });
    return this.http.get<any>(url, { headers: reqHeader }).pipe(catchError(this.handleError));
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
