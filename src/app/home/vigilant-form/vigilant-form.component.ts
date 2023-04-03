import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { registerPersonVigilanty, } from 'src/app/interfaces/registerPersonVigilanty';
import { Menssage } from 'src/app/models/router';
import { VigilantFormService } from 'src/app/service/vigilant-form.service';

@Component({
  selector: 'app-vigilant-form',
  templateUrl: './vigilant-form.component.html',
  styleUrls: ['./vigilant-form.component.css']
})
//HASTA AQUI
export class VigilantFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastName', 'id', 'destination', 'marca', 'date', 'portatil'];
  dataSource: MatTableDataSource<registerPersonVigilanty>;
  portatil = ['Si', 'No']
  public form: FormGroup
  public customerDetail: any = []
  listUser: registerPersonVigilanty[] = []
  response:boolean = false; responseTwo: Boolean = false; responseThree: Boolean = false
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private myFormsBilder: FormBuilder,
    private userService: VigilantFormService,
    private snack: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.initial()
    
  }
  initial() {
    this.form = this.myFormsBilder.group({
      nameOne: [Menssage.empty, Validators.compose([Validators.required])],
      lastname: [Menssage.empty, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])],
      date: [Menssage.empty, Validators.compose([Validators.required])],
      destination: [Menssage.empty, Validators.compose([Validators.required])],
      marca: [Menssage.empty, Validators.compose([Validators.nullValidator])],
      portatil: [Menssage.empty, Validators.compose([Validators.required])],
    })
    this.loadUser()
    
  }
  saveData() {
    console.log(this.form)
    const save: registerPersonVigilanty = {
      // position: 0, 
      name: this.form.value.nameOne,
      id: this.form.value.id,
      lastName: this.form.value.lastname,
      destination: this.form.value.destination,
      date: this.form.value.date,
      portatil: this.form.value.portatil,
      marca: this.form.value.marca,
    }
    
    console.log(save);
    this.userService.addUser(save)
    //muestra un mensaje de exito
    this.snack.open('El peaton fue registrado', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }
  loadUser() {
    this.listUser = this.userService.getUsers()
    this.dataSource = new MatTableDataSource(this.listUser)
    this.dataSource.sort = this.sort;
  }
  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo peaton', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
