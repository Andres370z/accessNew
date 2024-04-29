import { Injectable } from '@angular/core';
import { registerPersonVigilanty } from '../interfaces/registerPersonVigilanty';
import { RoutersLink } from '../models/router';
import { HttpsService } from './https.service';

@Injectable({
  providedIn: 'root'
})
export class VigilantFormService {
  
  userRegister: registerPersonVigilanty[] = [
    { name: '', id: 1.0079, lastName: '', destination: '', marca: '', date: '',laptopExit:'', portatil: '' },
    { name: '', id: 4.0026, lastName: '', destination: '', marca: '', date: '',laptopExit:'', portatil: '' },
  ]
  constructor(
    private registeresquest: HttpsService,
  ) { }
  clientUsers(inform:any){
    return  this.registeresquest.POST(RoutersLink.clientUsers, inform)
  }

  getClientUsers(id: string){
    return  this.registeresquest.GET(RoutersLink.clientUsersGet+id)
  }
  
  getClientUsersDetail(id: number){
    return  this.registeresquest.GET(RoutersLink.pedestrianEntranceDetail+id)
  }

  pedestrianEntrance(inform:any){
    return  this.registeresquest.POST(RoutersLink.pedestrianEntrance, inform)
  }

  pedestrianEntranceUpdate(id: number, inform:any){
    return  this.registeresquest.PUT(RoutersLink.pedestrianEntranceUpdate+id, inform)
  }

  getPedestrianEntrance(id: number){
    return  this.registeresquest.GET(RoutersLink.pedestrianEntranceGet+id)
  }

  getpedestrianEntranceUsers(id: number){
    return  this.registeresquest.GET(RoutersLink.pedestrianEntranceUsers+id)
  }
  

  getUsers() {
    return this.userRegister.slice()
  }
  addUser(users: registerPersonVigilanty) {
    this.userRegister.unshift(users)
  }
}
