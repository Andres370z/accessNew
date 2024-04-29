import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CreateAgentsService } from 'src/app/service/create-agents.service';
import { environment } from 'src/environments/environment';
declare var $: any;
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
  selector: 'app-headquarters',
  templateUrl: './headquarters.component.html',
  styleUrls: ['./headquarters.component.css']
})
export class HeadquartersComponent implements OnInit {

  public form: FormGroup;
  public formCustomer: FormGroup;
  public formEdit: FormGroup;
  public usersData: any;
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: any=[];
  public eventsDataCustomer: any=[];
  public customerDetail: any = [];
  public images:any = [];
  public eventItems: any = [];
  public selectItems: any;
  public idNumber: number;
  public custumerList: any;
  public img: string = environment.img;
  private needRefresh = false;
  public displayedColumns: string[] = ['id',  'name',  'surname', 'telephone', 'identificationCard','email', 'accion' ];
  public displayedColumnsList: string[] = ['id',  'color',  'title', 'direction','imgLogo', 'api_token', 'accion' ];
  public dataSource: MatTableDataSource<UserData>;
  public dataSourceCustumer: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public href: string = "";
  constructor(
    private localStore: LocalstoreService,
    private _https: AuthService,
    private https: CreateAgentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    this.href = window.location.origin;
    //this.getEventImg(this.usersData.user.idProyectsClients, '')
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      let token = parametros.get("id");
      console.log(token)
      if (token != null) {
        this.idNumber = parseInt(this.alert.convertTextDecrypt(token))
        console.log(this.idNumber)
        this.getEvents(this.idNumber);
        this.getListCustomer(this.idNumber);
      } 
  })
  }

  ngOnInit(): void {
    this.initial();
    this.initialCustomer();
  }
  initial(){
    /* if (localStorage.getItem('token') !== null) {
      this.router.navigate([RoutersLink.home]);
    } */
    this.form = this.formBuilder.group({
      name: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      surname: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      telephone: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      identificationCard: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      longitud: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      latitud: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      email: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.pattern(Menssage.valiEmail),
        Validators.minLength(5)
      ])],
      password: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      passwordVerifi: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      idrol: [Menssage.idRolAdminClients, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.idNumber, Validators.compose([
        Validators.required,
      ])],
    });
    this.formEdit = this.formBuilder.group({
      name: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      surname: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      telephone: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      identificationCard: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      longitud: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      latitud: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      email: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.pattern(Menssage.valiEmail),
        Validators.minLength(5)
      ])],
      password: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      passwordVerifi: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      id: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      idrol: [Menssage.empty, Validators.compose([
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

  getListCustomer(item: number){
    this.alert.loading();
      this._https.getListCustomer(item).then((resulta: any)=>{
            this.alert.messagefin(); 
            this.eventsDataCustomer = []
            console.log("hola")
            this.eventsDataCustomer.push({
              id:resulta.id,
              color: resulta.color,
              title: resulta.title,
              description: resulta.description,
              imgLogo: resulta.imgLogo,
              api_token: resulta.api_token
            },);
            console.log("que")
          this.dataSourceCustumer = new MatTableDataSource(this.eventsDataCustomer);
            //console.log(this.eventsDataCustomer)
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  getEvents(item: number){
    this.alert.loading();
      this._https.getListUsers(item).then((resulta: any)=>{
          console.log(resulta); 
            this.eventItems = resulta
            this.alert.messagefin(); 
            this.eventsData = []
            resulta.forEach((element: any) => {
              this.eventsData.push({
                id: element.id,
                name: element.name,
                surname: element.surname,
                telephone: element.telephone,
                identificationCard: element.identificationCard,
                email: element.email,
                idProyectsClients: element.idProyectsClients,
                idrol: element.idrol,
                latitud: element.latitud,
                longitud: element.longitud
              },);
            });
          this.dataSource = new MatTableDataSource(this.eventsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
            //console.log(this.eventsData)
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
    if (item.surname === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.surname);
      valid = false
    }
    if (item.telephone === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.telephone);
      valid = false
    }
    if (item.identificationCard === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.identificationCard);
      valid = false
    }
    if (item.email === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.email);
      valid = false
    }
    if (item.password === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.password);
      valid = false
    }
    if (item.passwordVerifi === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.passwordVerifi);
      valid = false
    }
    if (item.passwordVerifi != item.password) {
      this.alert.error(Menssage.error, "El La contraseña deben ser iguales");
      valid = false
    }
    if (item.idrol === Menssage.empty) {
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
  getEventImg(item: number, itenEvents:string){
      this._https.getEventImg(item, itenEvents).then((resulta: any)=>{
          console.log(resulta); 
          let count = 1;
          this.eventsData = []
          resulta.forEach(element => {
            this.eventsData.push({
                  id: count++,
                  idEvents:element.id,
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
  getFileDetails(event: any){
      let file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.dataURL = reader.result
        };
        this.formCustomer.controls['imgLogo'].setValue(file);  
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
        this._https.createSupervisor(item).then((resulta: any)=>{
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
    this.form.controls['idProyectsClients'].setValue(this.idNumber);  
    this.getEvents(this.idNumber);
  }
  
  cleanResetCustomer(){
    this.form.reset(); 
    this.form.controls['idProyectsClients'].setValue(this.idNumber);  
    this.getListCustomer(this.idNumber);
  }

  routeList(id:string){
    var code = btoa(id)
    this.router.navigate(['/home/createInstitution/headquarters/'+code]);
    
  }
  onSubmitCustomer(item: any){
    console.log(item)
    if (this.validCustomer(item)) {
        this.alert.loading();
        this._https.createCustomer(item).then((resulta: any)=>{
            this.cleanResetCustomer();
        }).catch((err: any)=>{
          console.log(err)
          if (err.error.message != undefined) {
            this._https.logout()
          }
          this.alert.error(Menssage.error, Menssage.server);
        });
    }
  }
  onSubmitEdit(item: any){
    console.log(item)
    if (this.valid(item)) {
        this.alert.loading();
        this.https.editAgents(item).then((resulta: any)=>{
          this.alert.messagefin()
            this.cerrarModal();
        }).catch((err: any)=>{
          console.log(err)
          
          this.alert.error(Menssage.error, Menssage.server);
        });
    }
  }
  validCustomer(item: any): boolean{
    let valid = true
    if (item.color === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.color);
      valid = false
    }
    if (item.title === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.title);
      valid = false
    }
    if (item.description === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.description);
      valid = false
    }
    if (item.imgLogo === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.imgLogo);
      valid = false
    }
    if (item.idProyectsClients === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idProyectsClients);
      valid = false
    }
    
    return valid
  }
  initialCustomer(){
    /* if (localStorage.getItem('token') !== null) {
      this.router.navigate([RoutersLink.home]);
    } */
    this.formCustomer = this.formBuilder.group({
      color: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      title: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      description: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      imgLogo: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.idNumber, Validators.compose([
        Validators.required,
      ])],
    });
  }
  editUsers(item:any){
    this.formEdit.controls['name'].setValue(item.name); 
    this.formEdit.controls['surname'].setValue(item.surname); 
    this.formEdit.controls['telephone'].setValue(item.telephone); 
    this.formEdit.controls['identificationCard'].setValue(item.identificationCard); 
    this.formEdit.controls['latitud'].setValue(item.latitud); 
    this.formEdit.controls['longitud'].setValue(item.longitud); 
    this.formEdit.controls['email'].setValue(item.email);
    this.formEdit.controls['idrol'].setValue(item.idrol); 
    this.formEdit.controls['id'].setValue(item.id); 
    this.formEdit.controls['idProyectsClients'].setValue(item.idProyectsClients); 
    $('#exampleModal').modal('show')
  }
  cerrarModal(){
    $('#exampleModal').modal('hide')
  }
}
