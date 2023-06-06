import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { accessPointUserData } from 'src/app/interfaces/accessPointUserData';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { PointAccessService } from 'src/app/service/point-access.service';
import { SystemTablesService } from 'src/app/service/system-tables.service';


@Component({
  selector: 'app-access-point',
  templateUrl: './access-point.component.html',
  styleUrls: ['./access-point.component.css']
})
export class AccessPointComponent implements OnInit {
  listUser: accessPointUserData[]=[]
  displayedColumns: string[] = ['id','name','place', 'accion'];
  dataSource: MatTableDataSource<accessPointUserData>;
  public form: FormGroup;
  public formEdit: FormGroup;
  public eventsData:any;
  public eventsDataEdit:any;
  response:boolean = false;
  public usersData: any
  public responseTwo:boolean = false;
  public customerDetail: any = []
  public listOffice: any = []
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private myFormBuilder: FormBuilder,
    private snack: MatSnackBar,
    private accesspointService: PointAccessService,
    private localStore: LocalstoreService,
    private alert: AlertService,
    private _https: AuthService,
    private excel: ExcelService,
    private router: Router,
    private systemTablesService: SystemTablesService,
    ) {
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail) 
      this.usersData = this.localStore.getSuccessLogin();
      this.getEvents(this.usersData.user.idProyectsClients);
      this.getOffice(this.usersData.user.idProyectsClients);
    }
  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      name: [Menssage.empty, Validators.compose([Validators.required])],
      place: [Menssage.empty, Validators.compose([Validators.required])],
      idOffices: [Menssage.empty, Validators.compose([Validators.required])],
      idusers: [this.usersData.user.id, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
      ])],
    })
    this.formEdit = this.myFormBuilder.group({
      name: [Menssage.empty, Validators.compose([Validators.required])],
      place: [Menssage.empty, Validators.compose([Validators.required])],
      idOffices: [Menssage.empty, Validators.compose([Validators.required])],
    })
    this.loadUsers()
  }

  getOffice(item: number){
    this.systemTablesService.getOffice(item).then((resulta: any)=>{
          this.listOffice = resulta
    }).catch((err: any)=>{
      console.log(err.error)
      if (err.error.message != undefined) {
        this._https.logout()
      }
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  getEvents(item: number){
    this.alert.loading();
      this.accesspointService.getAccessPoint(item).then((resulta: any)=>{
            this.alert.messagefin(); 
            this.eventsData = resulta
            this.listUser = []
            resulta.forEach((element: any) => {
              this.listUser.push({
                    id:element.id,
                    name: element.name,
                    place: element.place,
                    idOffices:element.idOffices,
              },);
            });
          this.dataSource = new MatTableDataSource(this.listUser);
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

  saveData(item: any){
      if (this.valid(item)) {
        this.alert.loading();
        this.accesspointService.accessPo(item).then((resulta: any)=>{
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

  valid(item: any): boolean{
    let valid = true
    if (item.name === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.name);
      valid = false
    }
    if (item.place === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.surname);
      valid = false
    }
    if (item.idOffices === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.password);
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

  cleanReset(){
    this.form.reset();
    this.form.controls['idusers'].setValue(this.usersData.user.id);  
    this.form.controls['idProyectsClients'].setValue(this.usersData.user.idProyectsClients); 
    this.getEvents(this.usersData.user.idProyectsClients);
  }

  loadUsers(){
    this.listUser = this.accesspointService.getUsers()
    this.dataSource = new MatTableDataSource(this.listUser)
  }

  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo registro', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  routeList(item: any){
    console.log(item)
    this.responseTwo = true;
    this.eventsDataEdit = item; 
    this.formEdit.controls['name'].setValue(item.name);   
    this.formEdit.controls['place'].setValue(item.place);
    this.formEdit.controls['idOffices'].setValue(item.idOffices); 
  }

  download(){
    this.excel.exportAsExcelFile(this.eventsData, "Registro_Puntos");
  }

  saveDataEdit(item: any){
      this.alert.loading();
      this.accesspointService.accessPoUpdate(this.eventsDataEdit.id,item).then((resulta: any)=>{
        this.cleanResetEdit();
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }

  cleanResetEdit(){
    this.formEdit.reset(); 
    this.responseTwo = false;
    this.getEvents(this.usersData.user.idProyectsClients);
  }
}
