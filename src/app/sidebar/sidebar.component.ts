import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { Menssage, RoutersLink } from '../models/router';
import { LocalstoreService } from '../service/localstore.service';
import { environment } from 'src/environments/environment';
import { PointAccessService } from '../service/point-access.service';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    //public menuItems: any[] = [];
    public menuItemsStore: any[];
    public usersData: any;
    public api = environment.img
    public customerDetail: any = [];
    @Input() menuItems: any[] = [];
    ps: any;
    constructor(
        private localStore: LocalstoreService,
        private router: Router,
        private _https:AuthService,
        private alert: AlertService,
        private accesspointService: PointAccessService,
    ) {
        this.usersData = this.localStore.getSuccessLogin();
        this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    logout(){
        if (this.usersData.user.idrol == Menssage.idRolAdminClientsVigilant) {
            const date = new Date()
            const dateEnd = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
            const timeEnd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            let dataEnd = this.localStore.getItem(Menssage.acccess)
            const data = {
                dateExit: dateEnd,
                timeExit: timeEnd,
            }
            this.alert.loading();
              this._https.accessPointRecordUpdate(dataEnd.id, data).then((resulta: any)=>{
                if (resulta) {
                  this.localStore.clear();
                  if (this.usersData.user.idrol == Menssage.idRolAdmin) {
                      this.router.navigate([RoutersLink.login]);
                  } else {
                      this.router.navigate([RoutersLink.loginClients+this.customerDetail.api_token]);
                  }
                  this.menuItemsStore = []
                } else {
                  this.alert.error(Menssage.error, Menssage.server);
                }
              }).catch((err: any)=>{
                this.alert.error(Menssage.error, Menssage.server);
              });
       
    
        } else {
            if (this.usersData.user.idrol == Menssage.idRolAdmin) {
                this.router.navigate([RoutersLink.login]);
            } else {
                this.router.navigate([RoutersLink.loginClients+this.customerDetail.api_token]);
            }
            this.menuItemsStore = [] 
        }
    }    

}
