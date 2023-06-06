import { Injectable } from '@angular/core';
import { RoutersLink } from '../models/router';
import { HttpsService } from './https.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private registeresquest: HttpsService,
  ) { }

  getCreateAgents(item: any){
    return  this.registeresquest.POST(RoutersLink.indexgetgoin, item)
  }
}
