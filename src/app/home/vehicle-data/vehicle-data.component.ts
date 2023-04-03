import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { VehicleDataService } from 'src/app/service/vehicle-data.service';

export interface vehicleDataInterface{
  placa: string,
  date: string,
  model: string,
  color: string,
  owner: string,
  office: string,
  parkinglot: string
}
@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {
  displayedColumns: string[] = ['placa','date','model','color','owner','office','parkinglot']
  dataSource: MatTableDataSource<vehicleDataInterface>
  public form: FormGroup
  vehicleList: vehicleDataInterface[]=[]
  response:boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private myFormsBuilder: FormBuilder,
    private vehicleDataService: VehicleDataService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormsBuilder.group({
      placa: [Menssage.empty, Validators.compose([Validators.required])],
      date: [Menssage.empty, Validators.compose([Validators.required])],
      model: [Menssage.empty, Validators.compose([Validators.required])],
      owner: [Menssage.empty, Validators.compose([Validators.required])],
      office: [Menssage.empty, Validators.compose([Validators.required])],
      parkinglot: [Menssage.empty, Validators.compose([Validators.required])],
      color:[Menssage.empty, Validators.compose([Validators.required])]
    })
    this.loadUser()
  }
  saveData(){
    //console.log(this.form);
    const save: vehicleDataInterface= {
      placa: this.form.value.placa,
      date: this.form.value.date,
      model: this.form.value.model,
      owner: this.form.value.owner,
      office: this.form.value.office,
      parkinglot: this.form.value.parkinglot,
      color: this.form.value.color
    }
    console.log(save);
    this.snack.open('Registro Completado', 'Operacion Exitosa',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
    
  }
  loadUser(){
    this.vehicleList = this.vehicleDataService.getData()
    this.dataSource = new MatTableDataSource(this.vehicleList)
  }
  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo registro', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
