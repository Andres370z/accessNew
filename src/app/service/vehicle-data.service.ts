import { Injectable } from '@angular/core';
import { vehicleDataInterface } from '../home/vehicle-data/vehicle-data.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {
  dataVehicleRegistered: vehicleDataInterface[]=[
    {placa: '', date: '', model: '', color: '',owner: '', office: '', parkinglot: ''}
  ]
  constructor() { }
  getData(){
    return this.dataVehicleRegistered.slice()
  }
}
