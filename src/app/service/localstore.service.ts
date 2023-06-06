import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {
  public login: string = "token"
  public customerDetail: string = "customerDetail"
  constructor() { }

  setSuccessLogin(item: any){
    localStorage.setItem(this.login,JSON.stringify(item))
  }

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
