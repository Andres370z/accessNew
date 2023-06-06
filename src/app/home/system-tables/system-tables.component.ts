import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { usersOffices } from 'src/app/interfaces/usersOffices';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { SystemTablesService } from 'src/app/service/system-tables.service';

@Component({
  selector: 'app-system-tables',
  templateUrl: './system-tables.component.html',
  styleUrls: ['./system-tables.component.css']
})

export class SystemTablesComponent implements OnInit {
  listUser: usersOffices[] = []
  displayedColumns: string[] = ['id', 'name', 'location', 'floorNumber', 'contact', 'telephone', 'email', 'ctel', 'accion'];
  public dataSource: MatTableDataSource<usersOffices>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public form: FormGroup
  public usersData: any
  public eventsData: any=[];
  public customerDetail: any = []
  responseOne: Boolean = false; responseTwo: Boolean = false;
  constructor(
    private myFormsBilder: FormBuilder,
    private systemTablesService: SystemTablesService,
    private _https: AuthService,
    private snack: MatSnackBar,
    private alert: AlertService,
    private excel: ExcelService,
    private localStore: LocalstoreService,
    ) {
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
      this.usersData = this.localStore.getSuccessLogin();
      this.getEvents(this.usersData.user.idProyectsClients);
    }

  ngOnInit(): void {
    this.initial()
  }

  

  initial(){
    this.form = this.myFormsBilder.group({
      name: [Menssage.empty, Validators.compose([Validators.required])],
      location: [Menssage.empty, Validators.compose([Validators.required])],
      position: [1, Validators.compose([Validators.required])],
      floorNumber: [Menssage.empty, Validators.compose([Validators.required])],
      contact: [Menssage.empty, Validators.compose([Validators.required])],
      telephone: [Menssage.empty, Validators.compose([Validators.required])],
      email: [Menssage.empty, Validators.compose([Validators.required, Validators.email])],
      ctel: [Menssage.empty, Validators.compose([Validators.required])],
      idusers: [this.usersData.user.id, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
      ])],
    })
    this.loadUser();
  }
  
  loadUser() {
    this.listUser = this.systemTablesService.getUsers()
    this.dataSource = new MatTableDataSource(this.listUser)
    this.dataSource.sort = this.sort;
  }
  getEvents(item: number){
    this.alert.loading();
      this.systemTablesService.getOffice(item).then((resulta: any)=>{
            this.alert.messagefin(); 
            this.eventsData = resulta
            this.listUser = []
            resulta.forEach((element: any) => {
              this.listUser.push({
                    id:element.id,
                    name: element.name,
                    location: element.location,
                    floorNumber: element.floorNumber,
                    contact: element.contact,
                    telephone: element.telephone,
                    email: element.position,
                    ctel: element.ctel,
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

  valid(item: any): boolean{
    let valid = true
    if (item.name === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.name);
      valid = false
    }
    if (item.position === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.surname);
      valid = false
    }
    if (item.location === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.telephone);
      valid = false
    }
    if (item.floorNumber === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.identificationCard);
      valid = false
    }
    if (item.contact === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.password);
      valid = false
    }
    if (item.telephone === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.passwordVerifi);
      valid = false
    }
    if (item.ctel === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idrol);
      valid = false
    }
    if (item.email === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.email);
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
  saveData(item: any){
    if (this.valid(item)) {
      this.alert.loading();
      this.systemTablesService.office(item).then((resulta: any)=>{
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
    this.form.controls['idusers'].setValue(this.usersData.user.id);  
    this.form.controls['idProyectsClients'].setValue(this.usersData.user.idProyectsClients);  
    this.getEvents(this.usersData.user.idProyectsClients);
  }

  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo registro', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeList(item: any){
    console.log(item)
  }

  download(){
    this.excel.exportAsExcelFile(this.eventsData, "Registros_Oficina");
  }
}


