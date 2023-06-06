import { Injectable } from '@angular/core';
import { RoutersLink } from '../models/router';
import { HttpsService } from './https.service';
import { accessPointUserData } from '../interfaces/accessPointUserData';

@Injectable({
  providedIn: 'root'
})
export class PointAccessService {
  userAccessPoint: accessPointUserData[]=[
    {id: 0, name:'', place: '', idOffices:0}
  ]
  constructor(
    private registeresquest: HttpsService,
  ) { }
  accessPo(inform:any){
    return  this.registeresquest.POST(RoutersLink.accessPoint, inform)
  }
  accessPoUpdate(id: number, inform:any){
    return  this.registeresquest.PUT(RoutersLink.accessPointUpdate+id, inform)
  }
  getAccessPoint(id: number){
    return  this.registeresquest.GET(RoutersLink.accessPointGet+id)
  }
  
  getUsers(){
    return this.userAccessPoint.slice()
  }

}
