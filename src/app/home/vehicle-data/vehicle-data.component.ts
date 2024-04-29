import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { vehicleDataInterface } from 'src/app/interfaces/register';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { SystemTablesService } from 'src/app/service/system-tables.service';
import { VehicleDataService } from 'src/app/service/vehicle-data.service';


@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {
  displayedColumns: string[] = ['placa','date','model','color','owner','office','parkinglot','accion']
  dataSource: MatTableDataSource<vehicleDataInterface>
  public eventsData: any=[];
  public form: FormGroup
  public usersData: any
  public customerDetail: any = []
  public userId: any = [];
  public listOffice: any = []
  vehicleList: vehicleDataInterface[]=[]
  response:boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private myFormsBuilder: FormBuilder,
    private vehicleDataService: VehicleDataService,
    private _https: AuthService,
    private snack: MatSnackBar,
    private alert: AlertService,
    private excel: ExcelService,
    private localStore: LocalstoreService,
    private systemTablesService: SystemTablesService,
    private router: Router,
    ) {
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
      this.usersData = this.localStore.getSuccessLogin();
      this.getOffice(this.usersData.user.idProyectsClients)
      this.getEvents(this.usersData.user.idProyectsClients)
    }

  ngOnInit(): void {
    this.initial()
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
  initial(){
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    this.form = this.myFormsBuilder.group({
      placa: [Menssage.empty, Validators.compose([Validators.required])],
      date: [dateEnd],
      model: [Menssage.empty, Validators.compose([Validators.required])],
      owner: [Menssage.empty, Validators.compose([Validators.required])],
      idOffices: [Menssage.empty, Validators.compose([Validators.required])],
      parkinglot: [Menssage.empty, Validators.compose([Validators.required])],
      color:[Menssage.empty, Validators.compose([Validators.required])],
      idusers: [this.usersData.user.id, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
      ])],
    })
    this.loadUser()
  }
  getEvents(item: number){
    console.log(item)
    this.alert.loading();
      this.vehicleDataService.getIntegratedVehicleFull(item).then((resulta: any)=>{
            this.alert.messagefin(); 
            this.eventsData = resulta
            this.vehicleList = []
            resulta.forEach((element: any) => {
              this.vehicleList.push({
                    id:element.idIntegrated,
                    placa: element.placa,
                    date: element.date,
                    model: element.model,
                    color: element.color,
                    owner: element.owner,
                    office: element.office,
                    parkinglot: element.parkinglot,
                    dateEntered: element.dateEntered,
                    timeEntered:element.timeEntered,
                    dateExit: element.dateExit,
                    timeExit:element.timeExit
              },);
            });
          this.dataSource = new MatTableDataSource(this.vehicleList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
            console.log(this.vehicleList)
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
    if (item.placa === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.name);
      valid = false
    }
    if (item.date === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.surname);
      valid = false
    }
    if (item.model === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.telephone);
      valid = false
    }
    if (item.office === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.identificationCard);
      valid = false
    }
    if (item.parkinglot === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.password);
      valid = false
    }
    if (item.color === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.passwordVerifi);
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
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    if (this.userId.length == 0) {
      if (this.valid(item)) {
        this.alert.loading();
        this.vehicleDataService.registeredVehicle(item).then((resulta: any)=>{
          const data = {
            dateEntered: dateEnd,
            timeEntered : timeEnd,
            idRegisteredVehicles:resulta.id,
            idusers: item.idusers,
            idProyectsClients: item.idProyectsClients,
          }
            this.saveDataExitEntrance(data);
        }).catch((err: any)=>{
          console.log(err)
          if (err.error.message != undefined) {
            this._https.logout()
          }
          this.alert.error(Menssage.error, Menssage.server);
        });
      }
    }else{
      const data = {
        dateEntered: dateEnd,
        timeEntered : timeEnd,
        idRegisteredVehicles:this.userId.id,
        idusers: item.idusers,
        idProyectsClients: item.idProyectsClients,
      }
      this.saveDataExitEntrance(data);
    }
  }
  saveDataExitEntrance(item: any){
    this.vehicleDataService.integratedVehicle(item).then((resulta: any)=>{
        this.cleanReset();
        this.alert.messagefin(); 
    }).catch((err: any)=>{
      console.log(err)
      if (err.error.message != undefined) {
        this._https.logout()
      } 
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  saveDataExit(item: any){
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' +(date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    const data = {
      dateExit: dateEnd,
      timeExit : timeEnd,
    }
    console.log(data, item)
      this.alert.loading();
      this.vehicleDataService.integratedVehicleUpdate(item.id,data).then((resulta: any)=>{
          this.cleanReset();
          this.alert.messagefin(); 
      }).catch((err: any)=>{
        console.log(err)
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
    if (this.userId.length != 0) {
      this.form.controls['date'].enable();  
      this.form.controls['placa'].enable(); 
      this.form.controls['model'].enable(); 
      this.form.controls['color'].enable();  
      this.form.controls['owner'].enable();  
      this.form.controls['parkinglot'].enable();   
      this.form.controls['idOffices'].enable();  
    }
    this.getEvents(this.usersData.user.idProyectsClients);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadUser(){
    this.vehicleList = this.vehicleDataService.getData()
    this.dataSource = new MatTableDataSource(this.vehicleList)
  }
  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo registro', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  routeListView(id:string){
    var code = btoa(id)
    console.log(code)
    this.router.navigate(['/home/vehicleRegistration/infoVehicleDetail/'+code]);
  }
  getFileDetails(event: any){
    let file = event.target.value
    console.log(file)
    this.alert.loading();
      this.vehicleDataService.getRegisteredVehicle(file).then((resulta: any)=>{
        this.alert.messagefin(); 
          if (resulta.length != 0) {
            this.userID(resulta)
          }
          
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
      
  }

  userID(resulta: any){
    this.userId = resulta;
    this.form.controls['placa'].setValue(this.userId.placa);  
    this.form.controls['date'].setValue(this.userId.date); 
    this.form.controls['model'].setValue(this.userId.model); 
    this.form.controls['color'].setValue(this.userId.color); 
    this.form.controls['owner'].setValue(this.userId.owner); 
    this.form.controls['parkinglot'].setValue(this.userId.parkinglot); 
    this.form.controls['idOffices'].setValue(this.userId.idOffices); 
    this.form.controls['date'].disable();  
    this.form.controls['placa'].disable(); 
    this.form.controls['model'].disable(); 
    this.form.controls['color'].disable();  
    this.form.controls['owner'].disable();  
    this.form.controls['parkinglot'].disable();   
    this.form.controls['idOffices'].disable();  

  }

  download(){
    this.excel.exportAsExcelFile(this.eventsData, "Registros_Vehiculos");
  }
}
