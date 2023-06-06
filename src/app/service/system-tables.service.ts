import { Injectable } from '@angular/core';
import { RoutersLink } from '../models/router';
import { HttpsService } from './https.service';
import { usersOffices } from '../interfaces/usersOffices';
//import { UserDataTable } from '../home/system-tables/system-tables.component';

@Injectable({
  providedIn: 'root'
})
export class SystemTablesService {
  // userList: UserDataTable [] = [
  //   {id:'', name: '', location: '', floorNumber: '', contact: '', telephone: '', email: '', ctel: '',position: 0}
  // ]
  listUser: usersOffices[] = [
    { name: '', location: 1, floorNumber: '', contact:'', telephone: '', email: '', ctel:'', id: 0},
  ];
  constructor(
    private registeresquest: HttpsService,
  ) { }
  office(inform:any){
    return  this.registeresquest.POST(RoutersLink.office, inform)
  }

  getOffice(id: number){
    return  this.registeresquest.GET(RoutersLink.officeGet+id)
  }

  getUsers() {
    return this.listUser.slice()
  }
}
