import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public usersData: any;
  public eventList: any ;
  public calendarVisible = false;
  public eventsData: any=[];
  public customerDetail: any = [];
  public images:any = [];
  public eventItems: any = [];
  constructor( 
    private localStore: LocalstoreService,
    private _https: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    private alert: AlertService) { 
    this.usersData = this.localStore.getSuccessLogin();
    this.eventList = Menssage;
    this.customerDetail = this.localStore.getItem(Menssage.customerDetail) 
  }

  ngOnInit(): void {
  }

}
