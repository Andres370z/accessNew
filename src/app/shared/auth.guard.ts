import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Menssage, RoutersLink } from '../models/router';
import { LocalstoreService } from '../service/localstore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public customerDetail: any = [];
  constructor(
    private router: Router,
    private localStore: LocalstoreService) {
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.localStore.getSuccessLogin();
      console.log(token)
      if(token === null){
        this.router.navigate([RoutersLink.login+this.customerDetail.api_token]);
        return false;
      }
      return true;
  }
  
}
