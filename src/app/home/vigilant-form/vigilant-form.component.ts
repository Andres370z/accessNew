import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { registerPersonVigilanty, } from 'src/app/interfaces/registerPersonVigilanty';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { SystemTablesService } from 'src/app/service/system-tables.service';
import { VigilantFormService } from 'src/app/service/vigilant-form.service';
import {PlatformModule} from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-vigilant-form',
  templateUrl: './vigilant-form.component.html',
  styleUrls: ['./vigilant-form.component.css']
})
//HASTA AQUI
export class VigilantFormComponent implements OnInit {
  displayedColumns: string[] = ['id',  'name', 'lastName', 'destination', 'marca', 'date', 'portatil', 'acciones'];
  dataSource: MatTableDataSource<registerPersonVigilanty>;
  portatil = ['Si', 'No']
  public form: FormGroup
  public formExit: FormGroup
  public usersData: any;
  public userId: any = [];
  public api = environment.img
  public customerDetail: any = []
  public listOffice: any = []
  public eventsData: any=[]
  public idclientUsers: number  
  public webcamImage!: WebcamImage;
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  sysImage = '';
  listUser: registerPersonVigilanty[] = []
  response:boolean = false; responseTwo: Boolean = false; responseThree: Boolean = false
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('firstNameField') firstNameField: ElementRef<HTMLInputElement>;
  constructor(
    private myFormsBilder: FormBuilder,
    private userService: VigilantFormService,
    private snack: MatSnackBar,
    private localStore: LocalstoreService,
    private alert: AlertService,
    private _https: AuthService,
    private excel: ExcelService,
    private router: Router,
    private systemTablesService: SystemTablesService,
    @Inject(PLATFORM_ID) private _platform: Object
  ) {
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    this.usersData = this.localStore.getSuccessLogin();
    this.getOffice(this.usersData.user.idProyectsClients)
    this.getEvents(this.usersData.user.idProyectsClients)
   }

  ngOnInit(): void {
    this.initial()
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
      this.firstNameField.nativeElement.focus();
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
      imgMenu:[Menssage.empty],
      idusers: [this.usersData.user.id, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
      ])],
    })
    this.formExit = this.myFormsBilder.group({
      laptopExit: [Menssage.empty, Validators.compose([Validators.required])],
      marcaSerialExit: [Menssage.empty, Validators.compose([Validators.required])],
      dateExit: [dateEnd, Validators.compose([Validators.required])],
      timeExit: [timeEnd, Validators.compose([Validators.required])],
      idclientUsers:[Menssage.empty, Validators.compose([Validators.required])],
      idusers: [this.usersData.user.id, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
      ])],
    })
    this.loadUser()
    
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
      this.userService.getPedestrianEntrance(item).then((resulta: any)=>{
            this.alert.messagefin(); 
            this.eventsData = resulta
            this.listUser = []
            resulta.forEach((element: any) => {
              this.listUser.push({
                    id:element.idPedestrian,
                    name: element.nameOne,
                    lastName: element.lastname,
                    destination: element.office,
                    date: element.dateEntered,
                    marca: element.marcaSerialEntered,
                    laptopExit:element.laptopExit,
                    portatil: element.laptopEntered,
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
    if (item.nameOne === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.name);
      valid = false
    }
    if (item.lastname === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.surname);
      valid = false
    }
    if (item.identificationCard === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.telephone);
      valid = false
    }
    if (item.dateTimeEntered === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.identificationCard);
      valid = false
    }
    if (item.idOffices === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.password);
      valid = false
    }
    if (item.marcaSerialEntered === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.passwordVerifi);
      valid = false
    }
    if (item.laptopEntered === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idrol);
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
        this.userService.clientUsers(item).then((resulta: any)=>{
          const data = {
            laptopEntered: item.laptopEntered,
            marcaSerialEntered: item.marcaSerialEntered,
            dateEntered: dateEnd,
            timeEntered : timeEnd,
            idclientUsers:resulta.id,
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
    } else {
      const data = {
        laptopEntered: item.laptopEntered,
        marcaSerialEntered: item.marcaSerialEntered,
        dateEntered: dateEnd,
        timeEntered : timeEnd,
        idclientUsers:this.userId.id,
        idusers: item.idusers,
        idProyectsClients: item.idProyectsClients,
      }
      this.saveDataExitEntrance(data);
    }
    
  }
  saveDataExitEntrance(item: any){
    this.userService.pedestrianEntrance(item).then((resulta: any)=>{
        this.cleanResetExit();
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
      laptopExit: item.laptopExit,
      marcaSerialExit: item.marcaSerialExit,
      dateExit: dateEnd,
      timeExit : timeEnd,
    }

      this.alert.loading();
      this.userService.pedestrianEntranceUpdate(item.idclientUsers,data).then((resulta: any)=>{
          this.cleanResetExit();
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
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    this.form.reset();
    this.form.controls['idusers'].setValue(this.usersData.user.id);  
    this.form.controls['idProyectsClients'].setValue(this.usersData.user.idProyectsClients);
    this.form.controls['dateEntered'].setValue(dateEnd);  
    this.form.controls['timeEntered'].setValue(timeEnd);  
    if (this.userId.length != 0) {
      this.form.controls['nameOne'].enable();  
      this.form.controls['lastname'].enable(); 
      this.form.controls['identificationCard'].enable();   
      this.form.controls['idOffices'].enable();  
    }  
    this.getEvents(this.usersData.user.idProyectsClients);
  }

  cleanResetExit(){
    this.formExit.reset();
    this.responseTwo = false
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    this.formExit.controls['dateExit'].setValue(dateEnd);   
    this.formExit.controls['timeExit'].setValue(timeEnd); 
    this.formExit.controls['idusers'].setValue(this.usersData.user.id);  
    this.formExit.controls['idProyectsClients'].setValue(this.usersData.user.idProyectsClients);  
    this.getEvents(this.usersData.user.idProyectsClients);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateData() {
    console.log(this.formExit)
    const save: registerPersonVigilanty = {
      // position: 0, 
      name: this.form.value.nameOne,
      id: this.form.value.id,
      lastName: this.form.value.lastname,
      destination: this.form.value.destination,
      date: this.form.value.date,
      portatil: this.form.value.portatil,
      laptopExit:this.form.value.marca,
      marca: this.form.value.marca,

    }
    
    console.log(save);
    this.userService.addUser(save)
    //muestra un mensaje de exito
    this.snack.open('El peaton fue registrado', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }
  loadUser() {
    this.listUser = this.userService.getUsers()
    this.dataSource = new MatTableDataSource(this.listUser)
    this.dataSource.sort = this.sort;
  }
  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo peaton', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  routeList(item: number){
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    this.responseTwo = true
    this.formExit.controls['idclientUsers'].setValue(item); 
    this.formExit.controls['dateExit'].setValue(dateEnd);   
    this.formExit.controls['timeExit'].setValue(timeEnd);  
  }

  getFileDetails(event: any){
    let file = event.target.value
    console.log(file)
    this.alert.loading();
      this.userService.getClientUsers(file).then((resulta: any)=>{
          if (resulta.length != 0) {
            this.userID(resulta)
          }
          this.alert.messagefin(); 
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
    this.form.controls['nameOne'].setValue(this.userId.nameOne);  
    this.form.controls['lastname'].setValue(this.userId.lastname); 
    this.form.controls['identificationCard'].setValue(this.userId.identificationCard); 
    this.form.controls['idOffices'].setValue(this.userId.idOffices); 
    this.form.controls['nameOne'].disable();  
    this.form.controls['lastname'].disable(); 
    this.form.controls['identificationCard'].disable();  
    this.form.controls['idOffices'].disable();  

  }

 

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
    console.info('received webcam image', webcamImage);
    this.form.controls['imgMenu'].setValue(this.sysImage); 
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  routeListView(id:string){
    var code = btoa(id)
    console.log(code)
    this.router.navigate(['/home/customerRegistration/infoDetail/'+code]);
  }

  download(){
    this.excel.exportAsExcelFile(this.eventsData, "Registros_Peatonal");
  }
}
