import { Injectable } from '@angular/core';
import { RoutersLink } from '../models/router';
import { HttpsService } from './https.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAgentsService {

  constructor(
    private registeresquest: HttpsService,
  ) { }
  createAgents(inform:any){
    return  this.registeresquest.POST(RoutersLink.register, inform)
  }
  editAgents(inform:any){
    return  this.registeresquest.PUT(RoutersLink.editUsers+'/'+inform.id, inform)
  }
  getCreateAgents(item: number){
    return  this.registeresquest.GET(RoutersLink.indexgetgoin+item)
  }
}
