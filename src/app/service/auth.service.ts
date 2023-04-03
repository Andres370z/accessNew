import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutersLink } from '../models/router';
import { AlertService } from './alert.service';
import { HttpsService } from './https.service';
import { LocalstoreService } from './localstore.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private registeresquest: HttpsService,
    private route: Router, 
    private localStore: LocalstoreService,
    private alert: AlertService
  ) { }

  create(inform:any){
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      password: "sumateClaro",
      password_confirmation : "sumateClaro",
      idCity: inform.idCity
    };
    return  this.registeresquest.POST(RoutersLink.register, data)
  }

  resgisterImageEvents(inform:any){
    return  this.registeresquest.POST(RoutersLink.resgisterImageEvents, inform)
  }
  createInstitution(inform:any){
    return  this.registeresquest.POST(RoutersLink.getEventPost, inform)
  }
  createCustomer(inform:any){
    return  this.registeresquest.POST(RoutersLink.customerDetailPost, inform)
  }
  createAssignUserAuditPost(inform:any){
    return  this.registeresquest.POST(RoutersLink.assignUserAuditPost, inform)
  }
  createSupervisor(inform:any){
    return  this.registeresquest.POST(RoutersLink.register, inform)
  }
  login(inform:any){
    return  this.registeresquest.POST(RoutersLink.loginApi, inform)
  }
  createtOperator(inform:any){
    return  this.registeresquest.POST(RoutersLink.operatorPost, inform)
  }
  logout(){
    this.localStore.clear();
    this.route.navigate([RoutersLink.login]);
  } 
  cerra(){
    this.alert.messagefin();
    localStorage.removeItem('token')
    this.route.navigate(['pages/login']);
  }

  getCity(){
    return  this.registeresquest.GET(RoutersLink.city)
  }
  getOperator(item: number){
    return  this.registeresquest.GET(RoutersLink.operator+item)
  }

  getAssignUserAudit(){
    return  this.registeresquest.GET(RoutersLink.assignUserAudit)
  }

  assignUserAuditReady(item: number){
    return  this.registeresquest.GET(RoutersLink.assignUserAuditReady+item)
  }

  initialRegistrationReady(item: number){
    return  this.registeresquest.GET(RoutersLink.initialRegistrationReady+item)
  }

  getSupervisor(item: any){
    return  this.registeresquest.POST(RoutersLink.indexgetgoin, item)
  }

  getStatus(item: string){
    return  this.registeresquest.GET(RoutersLink.status+item)
  }

  getUsers(){
    return  this.registeresquest.GET("user")
  }

  getUsersData(item: number){
    return  this.registeresquest.GET(RoutersLink.getUsersData+item)
  }

  getCustomerDetail(item: string){
    return  this.registeresquest.GET(RoutersLink.customerDetail+item)
  }

  gettotal(item: number, search: string){
    return  this.registeresquest.GET(RoutersLink.gettotal+item+'&buscar='+search)
  }

  getmenu(item: number, ){
    return  this.registeresquest.GET(RoutersLink.menu+item)
  }

  gettotaldatagallery(item: number, ){
    return  this.registeresquest.GET(RoutersLink.gettotaldatagallery+item)
  }

  getEvent(item: number){
    return  this.registeresquest.GET(RoutersLink.getEvent)
  }

  getEventList(item: number){
    return  this.registeresquest.GET(RoutersLink.getEventList+item)
  }
  getListCustomer(item: number){
    return  this.registeresquest.GET(RoutersLink.listCustomer+item)
  }
  getListUsers(item: number){
    return  this.registeresquest.GET(RoutersLink.listUsers+item)
  }

  getEventListno(item: number, idClientsProjects: number){
    const data={
      idEducationalInstitutions:item,
      idProyectsClients: idClientsProjects
    }
    return  this.registeresquest.POST(RoutersLink.getEventList, data)
  }

  gettotaldata(item: number, ){
    return  this.registeresquest.GET(RoutersLink.gettotaldata+item)
  }

  gettotaldataDelete(item: number, ){
    return  this.registeresquest.GET(RoutersLink.gettotaldataDelete+item)
  }
  deleteRegisterImageEvent(item: number){
    return  this.registeresquest.GET(RoutersLink.deleteRegisterImageEvent+item)
  }
  getEventImg(item: number, itemEvent: string){
    return  this.registeresquest.GET(RoutersLink.getEventImg+item+'&idevento='+itemEvent)
  }

  getCategory(){
    return  this.registeresquest.GET(RoutersLink.category)
  }

  getBenefits(){
    return  this.registeresquest.GET(RoutersLink.benefits)
  }
  getScale(){
    return  this.registeresquest.GET(RoutersLink.scale)
  }

  getChallenges(){
    return  this.registeresquest.GET(RoutersLink.challenges)
  }

  forgotPassword(item: string){
    return  this.registeresquest.GET(RoutersLink.forgotPassword+item)
  }

  createExpoalidos(inform:any){
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      monthlyBudget: inform.monthlyBudget,
      contactPerson : inform.contactPerson,
      terms: inform.terms,
      legalRepresentatives: inform.terms
    };
    return  this.registeresquest.POST(RoutersLink.registerExpoAllies, data)
  }

  createChallenge(inform:any){
    const formData = new FormData(); 
    formData.append("file", inform.file);
    formData.append("businessDescription", inform.description);
    formData.append("nit", inform.nit);
    formData.append("businessName", inform.businessName);
    formData.append("nameWorks", inform.name);
    formData.append("numberContact", inform.numberContact);
    formData.append("typeCategory", inform.typeCategory);
    return  this.registeresquest.POST(RoutersLink.registerChallenge, formData)
  }

  createEditUsers(inform:any){
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      idCity: inform.idCity,
      businessDescription: inform.businessDescription,
      contactPerson : inform.contactPerson,
      telephoneContact: inform.telephoneContact,
      legalRepresentatives: inform.legalRepresentatives,
      password: inform.password,
      id: inform.id
    };
    return  this.registeresquest.POST(RoutersLink.registerUpdate, data)
  }

  createUpdatePassword(inform:any){
    const data = {
      id: inform.id,
      email: inform.email,
      password: inform.password,
    };
    return  this.registeresquest.POST(RoutersLink.passwordUpdate, data)
  }

  createImgUpdate(inform:any){
    const formData = new FormData(); 
    formData.append("file", inform.file);
    formData.append("id", inform.id);
    return  this.registeresquest.POST(RoutersLink.imgUpdate, formData)
  }
}
