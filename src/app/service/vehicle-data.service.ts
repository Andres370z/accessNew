import { Injectable } from '@angular/core';
import { RoutersLink } from '../models/router';
import { HttpsService } from './https.service';
import { vehicleDataInterface } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {
  dataVehicleRegistered: vehicleDataInterface[]=[
    {id:0,placa: '', date: '', model: '', color: '',owner: '', office: '', parkinglot: '', dateEntered: '', timeEntered:'', dateExit: '', timeExit:'',}
  ]
  constructor(
    private registeresquest: HttpsService,
  ) { }
  registeredVehicle(inform:any){
    return  this.registeresquest.POST(RoutersLink.registeredVehicle, inform)
  }

  integratedVehicle(inform:any){
    return  this.registeresquest.POST(RoutersLink.integratedVehicle, inform)
  }
  integratedVehicleUpdate(id: number, inform:any){
    return  this.registeresquest.PUT(RoutersLink.integratedVehicleUpdate+id, inform)
  }

  getRegisteredVehicle(id: number){
    return  this.registeresquest.GET(RoutersLink.registeredVehicleGet+id)
  }

  getIntegratedVehicle(id: number){
    return  this.registeresquest.GET(RoutersLink.getIntegratedVehicle+id)
  }

  getIntegratedVehicleFull(id: number){
    return  this.registeresquest.GET(RoutersLink.getIntegratedVehicleFull+id)
  }

  getData(){
    return this.dataVehicleRegistered.slice()
  }
}
