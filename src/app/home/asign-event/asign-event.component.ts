import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface UserData {
  id:number,
  municipality: string,
  institutions: string,
  direction: string,
  rector: string,
  telephone: string,
  email: string
}
@Component({
  selector: 'app-asign-event',
  templateUrl: './asign-event.component.html',
  styleUrls: ['./asign-event.component.css']
})
export class AsignEventComponent implements OnInit {

  public form: FormGroup;
  public usersData: any;
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: any=[];
  public customerDetail: any = [];
  public images:any = [];
  public eventItems: any = [];
  public eventItemsList: any = [];
  public eventItemsSuper: any = [];
  public selectItems: any;
  private needRefresh = false;
  public displayedColumns: string[] = ['id',  'name',  'surname', 'institutions', 'sedeInstitutions', 'accion' ];
  public dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private localStore: LocalstoreService,
    private _https: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    console.log(this.usersData)
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    this.getEvents(this.usersData.user.idProyectsClients);
    this.getEventsInst(this.usersData.user.idProyectsClients);
    this.getSupervisor(this.usersData.user.idProyectsClients);
    //this.getEventImg(this.usersData.user.idProyectsClients, '')
  }

  ngOnInit(): void {
    this.initial();
  }
  initial(){
    /* if (localStorage.getItem('token') !== null) {
      this.router.navigate([RoutersLink.home]);
    } */
    this.form = this.formBuilder.group({
      idEducationalInstitutions: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      idinstitutionHeadquarters: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      idusersuper: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      idusers: [this.usersData.user.id, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
      ])],
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEvents(item: number){
    this.alert.loading();
      this._https.getAssignUserAudit().then((resulta: any)=>{
          console.log(resulta); 
            this.eventItems = resulta
            this.alert.messagefin(); 
            this.eventsData = []
            resulta.forEach((element: any) => {
              this.eventsData.push({
                    id:element.id,
                    name: element.name,
                    surname: element.surname,
                    institutions: element.institutions,
                    sedeInstitutions: element.sedeInstitutions
              },);
            });
          this.dataSource = new MatTableDataSource(this.eventsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
            console.log(this.eventsData)
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  valid(item: any): boolean{
    let valid = true
    if (item.idEducationalInstitutions === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idEducationalInstitutions);
      valid = false
    }
    if (item.idinstitutionHeadquarters === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idinstitutionHeadquarters);
      valid = false
    }
    if (item.idusersuper === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idusersuper);
      valid = false
    }
    if (item.idusers === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idusers);
      valid = false
    }
    if (item.idProyectsClients === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idProyectsClients);
      valid = false
    }
    
    return valid
}
  getEventImg(item: number, itenEvents:string){
      this._https.getEventImg(item, itenEvents).then((resulta: any)=>{
          console.log(resulta); 
          let count = 1;
          this.eventsData = []
          resulta.forEach(element => {
            this.eventsData.push({
                  id:element.id,
                  nameEvent: element.nameEvent,
                  companyNameEvent: element.companyNameEvent,
                  nitEvent: element.nitEvent,
                  dateEvent: element.dateEvent,
                  imgEvent: element.imgEvent
            },);
          });
          this.dataSource = new MatTableDataSource(this.eventsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }).catch((err: any)=>{
        console.log(err)
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  getFileDetails(event: number){
      console.log(this.form.controls['idEducationalInstitutions'].value)
      this.getEventList(event, this.usersData.user.idProyectsClients);
  }
  deleteList(id:number){
    this.alert.loading();
    this._https.deleteRegisterImageEvent(id).then((resulta: any)=>{
      this.alert.success(Menssage.exito, Menssage.successDelete);
      this.getEventImg(this.usersData.user.idProyectsClients, '')
    }).catch((err: any)=>{
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  resgisterImageEvents(){
    if (this.images.length != 0) {
      this.alert.loading();
      const data = {
        img: this.images,
        idEvent: this.selectItems, 
        idUsers: this.usersData.user.id, 
        idProyectsClients: this.usersData.user.idProyectsClients 
      }
      this._https.resgisterImageEvents(data).then((resulta: any)=>{
        this.alert.success(Menssage.exito, Menssage.successDelete);
        this.getEventImg(this.usersData.user.idProyectsClients, '')
        this.images = []
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
    } else {
      this.alert.error(Menssage.error, Menssage.idImg);
    }
    
  }
  onSubmit(item: any){
    console.log(item)
    if (this.valid(item)) {
        this.alert.loading();
        this._https.createAssignUserAuditPost(item).then((resulta: any)=>{
            this.cleanReset();
        }).catch((err: any)=>{
          console.log(err)
          if (err.error.message != undefined) {
            this._https.logout()
          }
          this.alert.error(Menssage.error, Menssage.server);
        });
    }
  }

  cleanReset(){
    this.form.reset();
    this.form.controls['idrol'].setValue(3);  
    this.form.controls['idProyectsClients'].setValue(this.usersData.user.idProyectsClients);  
    this.getEvents(this.usersData.user.idProyectsClients);
  }

  routeList(id:string){
    var code = btoa(id)
    this.router.navigate(['/home/createInstitution/headquarters/'+code]);
    
  }

  getEventList(item: number, idProyect: number){
    this.alert.loading();
      this._https.getEventList(item).then((resulta: any)=>{
          console.log(resulta); 
            this.eventItemsList = resulta
            this.alert.messagefin(); 
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }

  getEventsInst(item: number){
    this.alert.loading();
      this._https.getEvent(item).then((resulta: any)=>{
            this.eventItems = resulta
            this.alert.messagefin(); 
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  getSupervisor(item: number){
    const data = {
      idrol: 3,
      id: item
    }
    this.alert.loading();
      this._https.getSupervisor(data).then((resulta: any)=>{
          console.log(resulta); 
            this.eventItemsSuper = resulta
            this.alert.messagefin(); 
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
}
