import { Injectable } from '@angular/core';
import { registerPersonVigilanty } from '../interfaces/registerPersonVigilanty';

@Injectable({
  providedIn: 'root'
})
export class VigilantFormService {
  
  userRegister: registerPersonVigilanty[] = [
    { name: '', id: 1.0079, lastName: '', destination: '', marca: '', date: '', portatil: '' },
    { name: '', id: 4.0026, lastName: '', destination: '', marca: '', date: '', portatil: '' },
  ]
  constructor() { }
  getUsers() {
    return this.userRegister.slice()
  }
  addUser(users: registerPersonVigilanty) {
    this.userRegister.unshift(users)
  }
}
