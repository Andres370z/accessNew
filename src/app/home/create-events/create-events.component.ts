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
import Swal from 'sweetalert2';
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
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {
  public form: FormGroup;
  public usersData: any;
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: any=[];
  public customerDetail: any = [];
  public images:any = [];
  public eventItems: any = [];
  public selectItems: any;
  private needRefresh = false;
  public displayedColumns: string[] = ['id',  'name', 'direction', 'telephone', 'identification','email', 'type','accion' ];
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
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    this.getEvents(this.usersData.user.idProyectsClients);
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
      nameProjectsClients: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      addressProjectsClients: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      telephoneProjectsClients: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      identificationCardProjectsClients: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      emailProjectsClients: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.pattern(Menssage.valiEmail),
        Validators.minLength(5)
      ])],
      idUsers: [this.usersData.user.id, Validators.compose([
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
      this._https.getEvent(item).then((resulta: any)=>{
          console.log(resulta); 
            this.eventItems = resulta
            this.alert.messagefin(); 
            this.eventsData = []
            resulta.forEach((element: any) => {
              this.eventsData.push({
                    id: element.id,
                    name: element.nameProjectsClients,
                    direction: element.addressProjectsClients,
                    telephone: element.telephoneProjectsClients,
                    identification: element.identificationCardProjectsClients,
                    email: element.emailProjectsClients,
                    idProyectsClients: element.id,
                    type: element.userMaster,
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
    if (item.zode === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.zode);
      valid = false
    }
    if (item.daneMunicipality === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.daneMunicipality);
      valid = false
    }
    if (item.municipality === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.municipality);
      valid = false
    }
    if (item.daneInstitutions === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.daneInstitutions);
      valid = false
    }
    if (item.institutions === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.institutions);
      valid = false
    }
    if (item.direction === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.direction);
      valid = false
    }
    if (item.rector === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.rector);
      valid = false
    }
    if (item.telephone === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.telephone);
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
        this.form.controls['imgInstitutions'].setValue(file);  
  }
  deleteList(id:any){
    Swal.fire({
      title: 'Estas seguro de suspender este cliente',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFull(id);
      } else if (result.isDenied) {
        this.alert.error(Menssage.error, "Cancelo la suspención del cliente");
      }
    })
    
  }
  deleteFull(id:any){
    this.alert.loading();
    this._https.updateUsersClient(id).then((resulta: any)=>{
      this.alert.success(Menssage.exito, Menssage.successDelete);
      this.getEvents(this.usersData.user.idProyectsClients);
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
        this._https.createInstitution(item).then((resulta: any)=>{
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
    this.getEvents(this.usersData.user.idProyectsClients);
  }

  routeList(id:string){
    var code = btoa(id)
    this.router.navigate(['/home/createClients/listUsers/'+code]);
    
  }
}
