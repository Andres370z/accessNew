import { Injectable } from '@angular/core';
import { HttpsService } from './https.service';
import { RoutersLink } from '../models/router';

@Injectable({
  providedIn: 'root'
})
export class LogBooksService {

  constructor(
    private registeresquest: HttpsService,
  ) { }
  createLogBooks(inform:any){
    return  this.registeresquest.POST(RoutersLink.logBooks, inform)
  }
  editLogBooks(inform:any){
    return  this.registeresquest.PUT(RoutersLink.editUsers+'/'+inform.id, inform)
  }
  getLogBooks(item: number){
    return  this.registeresquest.GET(RoutersLink.logBooks+'/'+item)
  }

  logBooksAdmin(item: number){
    return  this.registeresquest.GET(RoutersLink.logBooksAdmin+'/'+item)
  }
}
