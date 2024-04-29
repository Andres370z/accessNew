import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { TableData } from 'src/app/md/md-table/md-table.component';
import esLocale from '@fullcalendar/core/locales/es'
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { Menssage, RoutersLink } from 'src/app/models/router';
import { LocalstoreService } from 'src/app/service/localstore.service';

@Component({
  selector: 'app-closing-minute',
  templateUrl: './closing-minute.component.html',
  styleUrls: ['./closing-minute.component.css']
})
export class ClosingMinuteComponent implements OnInit {

  public tableData1: TableData;
  public usersData: any;
  public eventList: any = [];
  public calendarVisible = false;
  public eventsData: any;
  public customerDetail: any = [];
  public calendarOptions?: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  constructor(
    private router: Router,
    private localStore: LocalstoreService,
    private alert: AlertService
  ) {
    this.usersData = this.localStore.getSuccessLogin();
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
   }

  ngOnInit(): void {
    this.getCalendar()
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
    console.log(arg);
    if (this.usersData.user.idrol === 3) {
      let token = this.convertTextEncrypt("0")
      this.localStore.setItem(arg,"minuta")
      console.log(RoutersLink.closingMinuteDetail+token)
      this.router.navigate([RoutersLink.closingMinuteDetail+token]);
    } else {
      this.alert.error(Menssage.error, Menssage.userDenied)
    }
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg.event._def);
    if (arg.event._def.publicId != "") {
      let token = this.convertTextEncrypt(arg.event._def.publicId)
      this.router.navigate([RoutersLink.closingMinuteDetail+token]);
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

}
