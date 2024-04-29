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
import { LogBooksService } from 'src/app/service/log-books.service';
declare var $: any;
@Component({
  selector: 'app-log-books',
  templateUrl: './log-books.component.html',
  styleUrls: ['./log-books.component.css']
})
export class LogBooksComponent implements OnInit {
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
  public displayedColumns: string[] = ['id',  'inicidente', 'fecha', 'lugar', 'victima', 'perpetrador' ,'accion' ];
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private localStore: LocalstoreService,
    private _https: LogBooksService,
    private https: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    
    this.getType()
    //this.getEventImg(this.usersData.user.idProyectsClients, '')
  }

  ngOnInit(): void {
    this.initial();
  }
  getType(){
    if (this.usersData.user.idrol === 2) {
      this.getEventsAdmin(this.usersData.user.idProyectsClients);
    } else {
      this.getEvents(this.usersData.user.id);
    }
  }
  initial(){
    /* if (localStorage.getItem('token') !== null) {
      this.router.navigate([RoutersLink.home]);
    } */
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    this.form = this.formBuilder.group({
      whatHappened: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      wherehappen: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      whom: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      whoPerpetrated: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      incidentType: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      causedIncident: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      incidentOrigin: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      incidentDate: [dateEnd, Validators.compose([
        Validators.required,
      ])],
      incidentTime: [timeEnd, Validators.compose([
        Validators.required,
      ])],
      idProyectsClients: [this.usersData.user.idProyectsClients, Validators.compose([
        Validators.required,
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

  getEventsAdmin(item: number){
    this.alert.loading();
      this._https.logBooksAdmin(item).then((resulta: any)=>{
          console.log(resulta); 
          this.tabletList(resulta)
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error.message != undefined) {
          this.https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  tabletList(resulta: any[]){
    this.eventItems = resulta
            this.alert.messagefin(); 
            this.eventsData = []
            resulta.forEach((element: any) => {
              this.eventsData.push({
                    id: element.id,
                    whatHappened: element.whatHappened,
                    wherehappen: element.wherehappen,
                    whom: element.whom,
                    incidentDate: element.incidentDate,
                    incidentTime: element.incidentTime,
                    perpetrador:element.whoPerpetrated,
                    incidentType: element.incidentType,
                    causedIncident:element.causedIncident,
                    incidentOrigin: element.incidentOrigin
              },);
            });
          this.dataSource = new MatTableDataSource(this.eventsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
            console.log(this.eventsData)
  }
  getEvents(item: number){
    this.alert.loading();
      this._https.getLogBooks(item).then((resulta: any)=>{
          console.log(resulta); 
          this.tabletList(resulta)
      }).catch((err: any)=>{
        console.log(err.error)
        if (err.error.message != undefined) {
          this.https.logout()
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
        //this.deleteFull(id);
      } else if (result.isDenied) {
        this.alert.error(Menssage.error, "Cancelo la suspención del cliente");
      }
    })
    
  }

  onSubmit(item: any){
    console.log(item)
    if (this.valid(item)) {
        this.alert.loading();
        this._https.createLogBooks(item).then((resulta: any)=>{
            this.cleanReset();
        }).catch((err: any)=>{
          console.log(err)
          if (err.error.message != undefined) {
            this.https.logout()
          }
          this.alert.error(Menssage.error, Menssage.server);
        });
    }
  }

  cleanReset(){
    this.alert.messagefin()
    this.form.reset();
    const date = new Date()
    const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    this.form.controls['incidentDate'].setValue(dateEnd);
    this.form.controls['incidentTime'].setValue(timeEnd);
    this.form.controls['idusers'].setValue(this.usersData.user.id); 
    this.form.controls['idProyectsClients'].setValue(this.usersData.user.idProyectsClients);  
    this.getType()
  }

  routeList(id:string){
    var code = btoa(id)
    this.router.navigate(['/home/createClients/listUsers/'+code]);
    
  }

  editUsers(item:any){
    this.selectItems = item;
    $('#exampleModal').modal('show')
  }
  cerrarModal(){
    $('#exampleModal').modal('hide')
  }
}
