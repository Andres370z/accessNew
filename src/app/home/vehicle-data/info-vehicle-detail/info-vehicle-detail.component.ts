import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { SystemTablesService } from 'src/app/service/system-tables.service';
import { VehicleDataService } from 'src/app/service/vehicle-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-vehicle-detail',
  templateUrl: './info-vehicle-detail.component.html',
  styleUrls: ['./info-vehicle-detail.component.css']
})
export class InfoVehicleDetailComponent implements OnInit {
  public form: FormGroup
  public usersData: any;
  portatil = ['Si', 'No']
  public usersDataList: any = [];
  public api = environment.img
  public customerDetail: any = []
  public listOffice: any = []
  public idNumber: number;
  constructor(
    private _https: AuthService,
    private alert: AlertService,
    private router: Router,
    private systemTablesService: SystemTablesService,
    private activatedRoute: ActivatedRoute,
    private myFormsBilder: FormBuilder,
    private localStore: LocalstoreService,
    private vehicleDataService: VehicleDataService,
  ) {
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    this.usersData = this.localStore.getSuccessLogin();
    this.getOffice(this.usersData.user.idProyectsClients)
    this.initial();
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      let token = parametros.get("id");
      if (token != null) {
        this.idNumber = parseInt(this.alert.convertTextDecrypt(token))
        this.getData(this.idNumber);
      } 
  }) }

  ngOnInit(): void {
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

  getData(item: number){
    this.vehicleDataService.getIntegratedVehicle(item).then((resulta: any)=>{
          this.usersDataList = resulta
          this.userID(resulta);
    }).catch((err: any)=>{
      console.log(err.error)
      if (err.error.message != undefined) {
         this._https.logout()
      }
      this.alert.error(Menssage.error, Menssage.server);
    });
  }
  initial() {
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    this.form = this.myFormsBilder.group({
      placa: [Menssage.empty, Validators.compose([Validators.required])],
      date: [dateEnd, Validators.compose([Validators.required])],
      model: [Menssage.empty, Validators.compose([Validators.required])],
      owner: [Menssage.empty, Validators.compose([Validators.required])],
      office: [Menssage.empty, Validators.compose([Validators.required])],
      parkinglot: [Menssage.empty, Validators.compose([Validators.required])],
      color:[Menssage.empty, Validators.compose([Validators.required])],
      dateEntered: [dateEnd, Validators.compose([Validators.required])],
      timeEntered: [timeEnd, Validators.compose([Validators.required])],
      idOffices: [Menssage.empty, Validators.compose([Validators.required])],
      dateExit: [dateEnd, Validators.compose([Validators.required])],
      timeExit: [timeEnd, Validators.compose([Validators.required])],
    })
    
  }

  userID(resulta: any){
    this.form.controls['placa'].setValue(resulta.placa);  
    this.form.controls['date'].setValue(resulta.date); 
    this.form.controls['model'].setValue(resulta.model); 
    this.form.controls['idOffices'].setValue(resulta.idOffice);
    this.form.controls['dateEntered'].setValue(resulta.dateEntered); 
    this.form.controls['timeEntered'].setValue(resulta.timeEntered);  
    this.form.controls['owner'].setValue(resulta.owner); 
    this.form.controls['parkinglot'].setValue(resulta.parkinglot); 
    this.form.controls['color'].setValue(resulta.color); 
    this.form.controls['dateExit'].setValue(resulta.dateExit); 
    this.form.controls['timeExit'].setValue(resulta.timeExit);  
    this.form.controls['placa'].disable();  
    this.form.controls['model'].disable(); 
    this.form.controls['idOffices'].disable();  
    this.form.controls['dateEntered'].disable();
    this.form.controls['timeEntered'].disable(); 
    this.form.controls['owner'].disable();
    this.form.controls['parkinglot'].disable();
    this.form.controls['color'].disable();
    this.form.controls['dateExit'].disable();
    this.form.controls['timeExit'].disable();
  }
  routeListView(){
    this.router.navigate(['/home/vehicleRegistration']);
  }
}
