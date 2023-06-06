import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Menssage, RoutersLink } from '../models/router';
import { LocalstoreService } from '../service/localstore.service';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public customerDetail: any = [];
  public usersData: any;
  constructor(
    private router: Router,
    private localStore: LocalstoreService,
        private _https:AuthService,
        private alert: AlertService,) {
      this.usersData = this.localStore.getSuccessLogin();
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.localStore.getSuccessLogin();
      console.log(token)
      if(token === null){
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
                  this.localStore.clear();
                  if (this.usersData.user.idrol == Menssage.idRolAdmin) {
                      this.router.navigate([RoutersLink.login]);
                  } else {
                      this.router.navigate([RoutersLink.loginClients+this.customerDetail.api_token]);
                  }
              }).catch((err: any)=>{
                this.alert.error(Menssage.error, Menssage.server);
              });
      
    
        } else {
            this.localStore.clear();
            if (this.usersData.user.idrol == Menssage.idRolAdmin) {
                this.router.navigate([RoutersLink.login]);
            } else {
                this.router.navigate([RoutersLink.loginClients+this.customerDetail.api_token]);
            }
        }
        return false;
      }
      return true;
  }
  
}
