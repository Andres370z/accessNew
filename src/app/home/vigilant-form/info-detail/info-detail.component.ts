import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { SystemTablesService } from 'src/app/service/system-tables.service';
import { VigilantFormService } from 'src/app/service/vigilant-form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css']
})
export class InfoDetailComponent implements OnInit {
  public form: FormGroup
  public usersData: any;
  portatil = ['Si', 'No']
  public usersDataList: any = [];
  public api = environment.img
  public customerDetail: any = []
  public listOffice: any = []
  public idNumber: number;
  constructor(
    private myFormsBilder: FormBuilder,
    private localStore: LocalstoreService,
    private systemTablesService: SystemTablesService,
    private _https: AuthService,
    private alert: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: VigilantFormService,
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
  })
  }

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
    this.userService.getClientUsersDetail(item).then((resulta: any)=>{
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
      nameOne: [Menssage.empty, Validators.compose([Validators.required])],
      lastname: [Menssage.empty, Validators.compose([Validators.required])],
      identificationCard: [Menssage.empty, Validators.compose([Validators.required])],
      dateEntered: [dateEnd, Validators.compose([Validators.required])],
      timeEntered: [timeEnd, Validators.compose([Validators.required])],
      idOffices: [Menssage.empty, Validators.compose([Validators.required])],
      marcaSerialEntered: [Menssage.empty, Validators.compose([Validators.nullValidator])],
      laptopEntered: [Menssage.empty, Validators.compose([Validators.required])],
      laptopExit: [Menssage.empty, Validators.compose([Validators.required])],
      marcaSerialExit: [Menssage.empty, Validators.compose([Validators.required])],
      dateExit: [dateEnd, Validators.compose([Validators.required])],
      timeExit: [timeEnd, Validators.compose([Validators.required])],
    })
    
  }

  userID(resulta: any){
    this.form.controls['nameOne'].setValue(resulta.nameOne);  
    this.form.controls['lastname'].setValue(resulta.lastname); 
    this.form.controls['identificationCard'].setValue(resulta.identificationCard); 
    this.form.controls['idOffices'].setValue(resulta.idOffice);
    this.form.controls['dateEntered'].setValue(resulta.dateEntered); 
    this.form.controls['timeEntered'].setValue(resulta.timeEntered);  
    this.form.controls['marcaSerialEntered'].setValue(resulta.marcaSerialEntered); 
    this.form.controls['laptopEntered'].setValue(resulta.laptopEntered); 
    this.form.controls['laptopExit'].setValue(resulta.laptopExit); 
    this.form.controls['marcaSerialExit'].setValue(resulta.marcaSerialExit); 
    this.form.controls['dateExit'].setValue(resulta.dateExit); 
    this.form.controls['timeExit'].setValue(resulta.timeExit);  
    this.form.controls['nameOne'].disable();  
    this.form.controls['lastname'].disable(); 
    this.form.controls['identificationCard'].disable();  
    this.form.controls['idOffices'].disable();  
    this.form.controls['dateEntered'].disable();
    this.form.controls['timeEntered'].disable(); 
    this.form.controls['marcaSerialEntered'].disable();
    this.form.controls['laptopEntered'].disable();
    this.form.controls['laptopExit'].disable(); 
    this.form.controls['marcaSerialExit'].disable();
    this.form.controls['dateExit'].disable();
    this.form.controls['timeExit'].disable();
  }
  routeListView(){
    this.router.navigate(['/home/customerRegistration']);
  }
}
