import { Injectable } from '@angular/core';
import { companyUserData } from '../home/company-registration/company-registration.component';

@Injectable({
  providedIn: 'root'
})
export class CompanyResgistrationService {
  userCompanyRegistration: companyUserData[]=[
    {name:'', nit:'',telephone:'',email: '',contact:'', departament: '', municipality: '', address: ''}
  ]
  constructor() { }
  getUser(){
    return this.userCompanyRegistration.slice()
  }
}
