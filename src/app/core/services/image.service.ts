import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  private _url: string = environment.UrlIMG;


  
  /**************************************************/
  /*                 ADD METHOD                     */
  /**************************************************/

  postImage(name : string , image : File) {



    let formData: FormData = new FormData();
    
    formData.append('file', image, name);
    

    return this.http.post<any>(this._url , formData);
  }

  
  /**************************************************/
  /*                 GET METHOD                     */
  /**************************************************/

  getImage(name : string): Observable<Blob> {

    return this.http.get(this._url + "/" + name, { responseType: 'blob' });
  }

  


}
