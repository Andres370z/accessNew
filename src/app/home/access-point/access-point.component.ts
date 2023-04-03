import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { PointAccessService } from 'src/app/service/point-access.service';

export interface accessPointUserData{
  name: string,
  place: string,
}
@Component({
  selector: 'app-access-point',
  templateUrl: './access-point.component.html',
  styleUrls: ['./access-point.component.css']
})
export class AccessPointComponent implements OnInit {
  listUser: accessPointUserData[]=[]
  displayedColumns: string[] = ['id','name','place'];
  dataSource: MatTableDataSource<any>;
  public form: FormGroup
  response:boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private myFormBuilder: FormBuilder,
    private snack: MatSnackBar,
    private accesspointService: PointAccessService

  ) { }
  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      name: [Menssage.empty, Validators.compose([Validators.required])],
      place: [Menssage.empty, Validators.compose([Validators.required])]
    })
    this.loadUsers()
  }
  saveData(){
    console.log(this.form)
    const save: accessPointUserData={
      name: this.form.value.name,
      place: this.form.value.place
    }
    console.log(save)
    this.snack.open('Registro Completado', 'Operacion Exitosa',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }
  loadUsers(){
    this.listUser = this.accesspointService.getUsers()
    this.dataSource = new MatTableDataSource(this.listUser)
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
