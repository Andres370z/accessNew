import { Injectable } from '@angular/core';
import { companyUserData } from '../interfaces/companyUserData';
import { HttpsService } from './https.service';
import { RoutersLink } from '../models/router';


@Injectable({
  providedIn: 'root'
})
export class CompanyResgistrationService {
  userCompanyRegistration: companyUserData[]=[
    {id:0,name:'', active:false}
  ]
  constructor(
    private registeresquest: HttpsService,
  ) { }
  getUser(){
    return this.userCompanyRegistration.slice()
  }
  customerCompany(item:any){
    return  this.registeresquest.POST(RoutersLink.customerCompany, item)
  }
  customerCompanyUpdate(id: number, item:any){
    return  this.registeresquest.PUT(RoutersLink.customerCompanyUpdate+id, item)
  }
  getCustomerCompany(id: number){
    return  this.registeresquest.GET(RoutersLink.customerCompanyGet+id)
  }
}
