import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageSub= new Subject<any>();


  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }



  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next(data);
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next('remove');
  }

  getItem(key){
    return localStorage.getItem(key);
  }

  constructor() { }
}
