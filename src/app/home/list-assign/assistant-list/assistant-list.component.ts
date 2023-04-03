import { Component, OnInit } from '@angular/core';
import { TableData } from 'src/app/md/md-table/md-table.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { Menssage, RoutersLink } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ViewChild } from '@angular/core';
import { forwardRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';  
  

declare const $: any;
@Component({
  selector: 'app-assistant-list',
  templateUrl: './assistant-list.component.html',
  styleUrls: ['./assistant-list.component.css']
})
export class AssistantListComponent implements OnInit {
  public tableData1: TableData;
  public usersData: any;
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: any;
  public customerDetail: any = [];
  public calendarOptions?: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  constructor(
    private localStore: LocalstoreService,
    private _https: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    console.log(this.usersData)
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)

    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      let token = parametros.get("token");
      console.log(token)
      if (token != null) {
        let tokenDecript = parseInt(this.convertTextDecrypt(token))
        console.log(tokenDecript)
        this.getMenu(tokenDecript, "");
      } else {
        this.customerDetail = [];
      }
  })
  }

  ngOnInit(): void {
    forwardRef(() => Calendar);
    
  }
  getMenu(item: number, search: string){
      this.alert.loading();
      this._https.initialRegistrationReady(item).then((resulta: any)=>{
            this.alert.messagefin();
            if (resulta.length != 0) {
              resulta.forEach(element => {
                  this.eventList.push(
                    {
                      id: element.id,
                      title: element.nameOperators,
                      start: element.hearingDate,
                      end: element.hearingDate,
                      className: 'event-rose'
                    },
                  );
              });
              if (this.eventList.length != 0) {
                this.getCalendar(); 
              }
              
            }
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this._https.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  getCalendar(){
    this.calendarOptions = {
      locale: esLocale,
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth'
      },
      aspectRatio: 1.5,
      views: {
        dayGridMonth: { buttonText: "month" },
        timeGridWeek: { buttonText: "week" },
        timeGridDay: { buttonText: "day" }
      },

      initialView: 'dayGridMonth',
      events: this.eventList, // alternatively, use the `events` setting to fetch from a feed
     
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
    this.calendarVisible = true;
  }

  handleDateClick(arg: DateClickArg) {
    console.log('dateclick');
    console.log(arg);
    console.log('dateclick');
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg.event._def);
    if (arg.event._def.publicId != "") {
      let token = this.convertTextEncrypt(arg.event._def.publicId)
      this.router.navigate([RoutersLink.assistantDetail+token]);
    }
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log('DragStop');
    console.log(arg);
    console.log('DragStop');
  }

  //method is used to encrypt and decrypt the text  
  convertTextEncrypt(text:string) {  
      return window.btoa(text)
      //return CryptoJS.AES.encrypt(text, Menssage.passwordAES).toString().replace('Por21Ld', '/');  
  }

  convertTextDecrypt(text:string) {   
    return window.atob(text)
      //return CryptoJS.AES.decrypt(text, Menssage.passwordAES).toString(CryptoJS.enc.Utf8);  
  } 
}
