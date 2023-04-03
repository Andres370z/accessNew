import { Component, OnInit } from '@angular/core';
import { TableData } from 'src/app/md/md-table/md-table.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { Menssage, RoutersLink } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ViewChild } from '@angular/core';
import { forwardRef } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
@Component({
  selector: 'app-list-assign',
  templateUrl: './list-assign.component.html',
  styleUrls: ['./list-assign.component.css']
})
export class ListAssignComponent implements OnInit {
  public tableData1: TableData;
  public usersData: any;
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: any;
  public customerDetail: any = [];
  constructor( private localStore: LocalstoreService,
    private _https: AuthService,
    private router: Router,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    console.log("uno"+this.usersData.user.idProyectsClients)
    console.log("uno"+this.customerDetail)
  }

  ngOnInit(): void {
    if (this.usersData) {
      this.getMenu(this.usersData.user.idProyectsClients);
    }
  }

  getMenu(item: number){
    console.log(item)
    this.alert.loading();
    this._https.assignUserAuditReady(item).then((resulta: any)=>{
          this.alert.messagefin();
          this.eventList = resulta
    }).catch((err: any)=>{
      console.log(err)
      if (err.error.message != undefined) {
        this._https.logout()
      }
      this.alert.error(Menssage.error, Menssage.server);
    });
  }
  routerList(item: any){
    console.log(item)
      let token = this.convertTextEncrypt(item.id)
      this.router.navigate([RoutersLink.assistant+token]);
  }
  convertTextEncrypt(text:string) {  
    return window.btoa(text)
    //return CryptoJS.AES.encrypt(text, Menssage.passwordAES).toString().replace('Por21Ld', '/');  
  } 
}
