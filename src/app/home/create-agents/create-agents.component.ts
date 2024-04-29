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
import { CreateAgentsService } from 'src/app/service/create-agents.service';
import { userData } from 'src/app/interfaces/userData';
declare var $: any;
@Component({
  selector: 'app-create-agents',
  templateUrl: './create-agents.component.html',
  styleUrls: ['./create-agents.component.css']
})
export class CreateAgentsComponent implements OnInit {

  public form: FormGroup;
  public formEdit: FormGroup;
  public usersData: any;
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: userData[]=[];
  public customerDetail: any = [];
  public images:any = [];
  public eventItems: any = [];
  public selectItems: any;
  private needRefresh = false;
  public displayedColumns: string[] = ['id',  'name',  'surname', 'telephone', 'identificationCard','email', 'accion' ];
  public dataSource: MatTableDataSource<userData>;
  public titleCreate: string = "";
  public titleList: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private localStore: LocalstoreService,
    private _https: AuthService,
    private https: CreateAgentsService,
    private router: Router,
    public formBuilder: FormBuilder,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    this.getEvents(this.usersData.user.idProyectsClients);
    this.titleCreate = this.usersData.user.idrol == Menssage.idRolAdmin ? "Registrar Usuario Admin cliente" : "Registrar Usuario cliente" 
    this.titleList = this.usersData.user.idrol == Menssage.idRolAdmin  ? "Lista de usuarios admin" : "Lista de usuarios cliente"
  }

  ngOnInit(): void {
    this.initial();
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
      idrol: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
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
    if (this.usersData.user.idrol == Menssage.idRolAdminClients) {
      this.form.controls['idrol'].setValue(Menssage.idRolAdminClientsVigilant); 
    }else{
      this.form.controls['idrol'].setValue( Menssage.idRolAdmin); 
    }
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
      this.https.getCreateAgents(item).then((resulta: any)=>{
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
        this.form.controls['imgInstitutions'].setValue(file);  
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
        this.https.createAgents(item).then((resulta: any)=>{
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
  onSubmitEdit(item: any){
    console.log(item)
    if (this.valid(item)) {
        this.alert.loading();
        this.https.editAgents(item).then((resulta: any)=>{
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
