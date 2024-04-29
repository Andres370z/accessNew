import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { companyUserData } from 'src/app/interfaces/companyUserData';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ClosingMinuteService } from 'src/app/service/closing-minute.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-closing-minute-detail',
  templateUrl: './closing-minute-detail.component.html',
  styleUrls: ['./closing-minute-detail.component.css']
})
export class ClosingMinuteDetailComponent implements OnInit {
  public form: FormGroup;
  listUser: companyUserData[]=[]
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
  public displayedColumnsVehicle: string[] = ['placa','date','model','color','owner','office','parkinglot']
  public displayedColumnsEntrance: string[] = ['id',  'name', 'lastName', 'destination', 'marca', 'date', 'portatil'];
  public displayedColumnsCompany: string[] = ['id','name','active'];
  public displayedColumnsBooks: string[] = ['id',  'inicidente', 'fecha', 'lugar', 'victima', 'perpetrador'  ];
  public displayedColumns: string[] = ['id',  'name',  'surname', 'telephone', 'identificationCard','email' ];
  public dataSourceVehicle: MatTableDataSource<any>;
  public dataSourceEntrance: MatTableDataSource<any>;
  public dataSourceCompany: MatTableDataSource<any>;
  public dataSourceBooks: MatTableDataSource<any>;
  public dataSource: MatTableDataSource<any>;
  public dataSourceCustumer: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public href: string = "";
  constructor(
    private localStore: LocalstoreService,
    private _https: AuthService,
    private router: Router,
    private closingMinute:ClosingMinuteService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    this.selectItems = this.localStore.getItem("minuta")
    //this.getEventImg(this.usersData.user.idProyectsClients, '')
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      let token = parametros.get("id");
      console.log(token)
      this.idNumber = parseInt(this.alert.convertTextDecrypt(token))
      if (this.idNumber != 0) {
        console.log(this.idNumber)
      }else{
        const data = {
          idUsers:this.usersData.user.id,
          date: this.selectItems.dateStr
        }
       this.createData(data)
      }
  })
  }

  ngOnInit(): void {
  }

  getEvents(item: number){
    this.alert.loading();
      this.closingMinute.getClosingMinute(item).then((resulta: any)=>{
            this.alert.messagefin(); 
            this.eventsData = resulta
            console.log(this.eventsData)
      }).catch((err: any)=>{
        console.log(err.error)
       /*  if (err.error.message != undefined) {
          this._https.logout()
        } */
        this.alert.error(Menssage.error, Menssage.server);
      });
  }

  createData(item: any){
    this.alert.loading();
    this.closingMinute.indexClosingMinute(item).then((resulta: any)=>{
      this.alert.messagefin();
        this.eventList = resulta;
        this.tabletList(this.eventList.logBooks)
        this.incidente(this.eventList.customerCompany)
    }).catch((err: any)=>{
        console.log(err)
      /* if (err.error.message != undefined) {
        this._https.logout()
      } */
      this.alert.error(Menssage.error, Menssage.server);
    });
  }
  tabletList(resulta: any[]){
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
      this.dataSourceBooks = new MatTableDataSource(this.eventsData);
      this.dataSourceBooks.paginator = this.paginator;
      this.dataSourceBooks.sort = this.sort;
      console.log(this.eventsData)
  }
  incidente(resulta: any[]){
    this.listUser = []
            resulta.forEach((element: any) => {
              this.listUser.push({
                    id:element.id,
                    name: element.nameEvents,
                    active: element.active,
              },);
            });
    this.dataSourceCompany = new MatTableDataSource(this.listUser);
    this.dataSourceCompany.paginator = this.paginator;
    this.dataSourceCompany.sort = this.sort;
  }
}
