import { Injectable } from '@angular/core';
import { HttpsService } from './https.service';
import { RoutersLink } from '../models/router';

@Injectable({
  providedIn: 'root'
})
export class ClosingMinuteService {

  constructor(
    private registeresquest: HttpsService,
  ) { }
  createClosingMinute(inform:any){
    return  this.registeresquest.POST(RoutersLink.closingMinute, inform)
  }
  editClosingMinute(inform:any){
    return  this.registeresquest.PUT(RoutersLink.editUsers+'/'+inform.id, inform)
  }
  getClosingMinute(item: number){
    return  this.registeresquest.GET(RoutersLink.closingMinute+'/'+item)
  }

  closingMinuteAdmin(item: any){
    return  this.registeresquest.POST(RoutersLink.closingMinuteAdmin, item)
  }

  indexClosingMinute(item: any){
    return  this.registeresquest.POST(RoutersLink.indexClosingMinute, item)
  }
}
