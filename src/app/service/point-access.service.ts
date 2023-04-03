import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointAccessService {
  userAccessPoint=[]=[
    {id: '', name:'', place: ''}
  ]
  constructor() { }
  getUsers(){
    return this.userAccessPoint.slice()
  }

}
