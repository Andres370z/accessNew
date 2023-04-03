import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  
import { TableData } from 'src/app/md/md-table/md-table.component';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import { InitDetail } from 'lightgallery/lg-events';
import { ExcelService } from 'src/app/service/excel.service';
export interface UserData {
  id: number,
  idRegister: number,
  name: string,
  company: string,
  nit: string,
  fechaEvent: string,
  nameUser: string,
  surname: string,
  service: string,
  subservice:string,
  document: string,
  email: string,
  telephone: string,
  fecha: string,
}

@Component({
  selector: 'app-assistant-detail',
  templateUrl: './assistant-detail.component.html',
  styleUrls: ['./assistant-detail.component.css']
})
export class AssistantDetailComponent implements OnInit {
  private lightGallery!: LightGallery;
  private needRefresh = false;
  public displayedColumns: string[] = ['id',  'company', 'nameUser', 'surname', 'service', 'subservice'
  , 'email', 'telephone', 'fecha', 'accion' ];
  public dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public title = 'angular-demo';
  public settings = {
      counter: false,
      plugins: [lgZoom],
  };
  public items = [
      {
          id: '1',
          size: '450',
          src: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
          thumb: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      },
      {
          id: '2',
          size: '450',
          src: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
          thumb: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      },
  ];
  
  public tableData1: TableData;
  public usersData: any;
  public galleryDataImage: any =[];
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: any = [];
  public customerDetail: any = [];
  constructor(private localStore: LocalstoreService,
      private activatedRoute: ActivatedRoute,
      private _https: AuthService,
      private router: Router,
      private alert: AlertService,
      private excel: ExcelService) { 
      this.usersData = this.localStore.getSuccessLogin();
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
      this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
        let token = parametros.get("token");
        console.log(token)
        if (token != null) {
          let tokenDecript = parseInt(this.convertTextDecrypt(token))
          console.log(tokenDecript)
          this.gettotaldatagallery(tokenDecript)
          this.gettotaldata(tokenDecript)
        } else {
          this.customerDetail = [];
        }
    })
    this.dataSource = new MatTableDataSource(this.eventsData);
  }
  
  ngAfterViewChecked(): void {
      if (this.needRefresh) {
          this.lightGallery.refresh();
          this.needRefresh = false;
      }
  }

  
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onInit = (detail: InitDetail): void => {
      this.lightGallery = detail.instance;
  };

  convertTextDecrypt(text:string) {   
    return window.atob(text)
      //return CryptoJS.AES.decrypt(text, Menssage.passwordAES).toString(CryptoJS.enc.Utf8);  
  }  

  gettotaldatagallery(item: number){
    this.alert.loading();
    this._https.gettotaldatagallery(item).then((resulta: any)=>{
      this.galleryDataImage = resulta;
      this.alert.messagefin();
    }).catch((err: any)=>{
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  gettotaldata(item: number){
    this.alert.loading();
    this._https.gettotaldata(item).then((resulta: any)=>{
      let count = 1;
      resulta.forEach(element => {
        this.eventsData.push({
              id: count++,
              idRegister:element.id,
              name: element.nameEvent,
              company: element.companyNameEvent,
              nit: element.nitEvent,
              fechaEvent: element.dateEvent,
              nameUser: element.firstName,
              surname: element.secondName,
              service: element.secondSurname,
              subservice:element.documentType,
              document: element.DocumentNumber,
              email: element.email,
              telephone: element.telephone,
              fecha: element.fecha,
        },);
      });
      this.dataSource = new MatTableDataSource(this.eventsData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.alert.messagefin();
    }).catch((err: any)=>{
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  deleteList(item: number){
    this.alert.loading();
    this._https.gettotaldataDelete(item).then((resulta: any)=>{
      this.alert.success(Menssage.exito, Menssage.successDelete);
      this.gettotaldata(item);
    }).catch((err: any)=>{
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  dowload(){
    console.log("entro");
    if (this.eventsData.length != 0) {
      this.excel.exportAsExcelFile(this.eventsData, Menssage.nameEvents);
    }else{
      this.alert.error(Menssage.error, Menssage.nameEventsNull);
    }
  }
}