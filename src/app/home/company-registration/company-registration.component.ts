import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { companyUserData } from 'src/app/interfaces/companyUserData';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { CompanyResgistrationService } from 'src/app/service/company-resgistration.service';
import { ExcelService } from 'src/app/service/excel.service';
import { LocalstoreService } from 'src/app/service/localstore.service';


@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {
  departamento = ['Amazonas','Antioquia','Arauca','Atlántico','Bogotá','Bolívar','Boyacá','Caldas',
  'Caquetá','Casanare','Cauca','Cesar','Chocó','Córdoba','Cundinamarca','Guainía','Guaviare','Huila', 
  'La Guajira','Magdalena','Meta','Nariño','Norte de Santander','Putumayo','Quindío','Risaralda',
  'San Andrés y Providencia','Santander','Sucre','Tolima','Valle del Cauca','Vaupés','Vichada']
  displayedColumns: string[] = ['id','name','active','accion'];
  portatil = [{name:'Activo', valor: true}, {name:'Inactivo', valor: false}]
  dataSource: MatTableDataSource<companyUserData>;
  listUser: companyUserData[]=[]
  public form: FormGroup
  public usersData: any;
  public registerId: number = 0;
  public eventsData: any;
  public customerDetail: any = [];
  response:boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private myFormsBuilder: FormBuilder,
    private companyService: CompanyResgistrationService,
    private snack: MatSnackBar,
    private alert: AlertService,
    private _https: AuthService,
    private excel: ExcelService,
    private localStore: LocalstoreService,
    ) {
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
      this.usersData = this.localStore.getSuccessLogin();
      this.getEvents(this.usersData.user.idProyectsClients)
    }

  ngOnInit(): void {
    this.intial()
    
  }
  intial(){
    this.form = this.myFormsBuilder.group({
      nameEvents: [Menssage.empty, Validators.compose([Validators.required])],
      active: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      idusers: [this.usersData.user.id, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
      ])],

    })
    this.loadUsers()
  }
  loadUsers(){
    this.listUser = this.companyService.getUser()
    this.dataSource = new MatTableDataSource(this.listUser)
  }
  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo usuario', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
  getEvents(item: number){
    this.alert.loading();
      this.companyService.getCustomerCompany(item).then((resulta: any)=>{
            this.alert.messagefin(); 
            this.eventsData = resulta
            this.listUser = []
            resulta.forEach((element: any) => {
              this.listUser.push({
                    id:element.id,
                    name: element.nameEvents,
                    active: element.active,
              },);
            });
          this.dataSource = new MatTableDataSource(this.listUser);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }

  cleanReset(){
    this.form.reset();
    this.form.controls['idusers'].setValue(this.usersData.user.id);  
    this.form.controls['idProyectsClients'].setValue(this.usersData.user.idProyectsClients);
    this.getEvents(this.usersData.user.idProyectsClients);
  }
  valid(item: any): boolean{
    let valid = true
    if (item.nameEvents === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.name);
      valid = false
    }
    if (item.active === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.surname);
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

  routeList(item: any){
    this.registerId = item.id;
    this.form.controls['nameEvents'].setValue(item.nameEvents);  
    this.form.controls['active'].setValue(item.active);  
  }
  saveData(item: any){
    if (this.registerId == 0) {
      this.createData(item);
    } else {
      this.updateData(item);
    }
  }

  createData(item: any){
    if (this.valid(item)) {
      this.alert.loading();
      this.companyService.customerCompany(item).then((resulta: any)=>{
        this.cleanReset()
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
    }
  }

  updateData(item: any){
    if (this.valid(item)) {
      this.alert.loading();
      this.companyService.customerCompanyUpdate(this.registerId, item).then((resulta: any)=>{
        this.cleanReset()
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
    }
  }
}
