import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {
  public login: string = "token"
  public customerDetail: string = "customerDetail"
  authSub = new Subject<any>();
  constructor() { }

  setSuccessLogin(item: any){
    localStorage.setItem(this.login,JSON.stringify(item))
  }
  /**Andres */
  
  getSuccessLogin():any{
    let dataUSers: string = `${localStorage.getItem(this.login)}`;
    return JSON.parse(dataUSers);
  }

  setItem(item: any, data: string){
    localStorage.setItem(data,JSON.stringify(item))
  }

  getItem(data: string):any{
    let dataUSers: string = `${localStorage.getItem(data)}`;
    return JSON.parse(dataUSers);
  }
  clear(){
    localStorage.clear();
  }
  removeEnd(data: string){
    localStorage.removeItem(data)
  }
}
