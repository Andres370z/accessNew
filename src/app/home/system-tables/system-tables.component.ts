import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { SystemTablesService } from 'src/app/service/system-tables.service';

export interface usersElement {
  name: string;
  position: number;
  location: number;
  floorNumber: string;
  contact: string;
  telephone: string;
  email: string;
  ctel: string;
  id: string;
}
const listUser: usersElement[] = [
  {position: 1, name: '', location: 1, floorNumber: '', contact:'', telephone: '', email: '', ctel:'', id: ''},
];
@Component({
  selector: 'app-system-tables',
  templateUrl: './system-tables.component.html',
  styleUrls: ['./system-tables.component.css']
})

export class SystemTablesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'location', 'floorNumber', 'contact', 'telephone', 'email', 'ctel', 'id'];
  dataSource = listUser;
  public form: FormGroup
  responseOne: Boolean = false; responseTwo: Boolean = false;
  constructor(
    private myFormsBilder: FormBuilder,
    private systemTablesService: SystemTablesService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormsBilder.group({
      name: [Menssage.empty, Validators.compose([Validators.required])],
      location: [Menssage.empty, Validators.compose([Validators.required])],
      floorNumber: [Menssage.empty, Validators.compose([Validators.required])],
      contact: [Menssage.empty, Validators.compose([Validators.required])],
      telephone: [Menssage.empty, Validators.compose([Validators.required])],
      email: [Menssage.empty, Validators.compose([Validators.required, Validators.email])],
      ctel: [Menssage.empty, Validators.compose([Validators.required])],
    })
  }
  saveData(){
    //console.log(this.form);
    const save: usersElement = {
      position: 1,
      name: this.form.value.name,
      location: this.form.value.location,
      floorNumber: this.form.value.floorNumber,
      contact: this.form.value.contact,
      telephone: this.form.value.telephone,
      email: this.form.value.email,
      ctel: this.form.value.ctel,
      id: ''
    }
    console.log(save);
    //muestra un mensaje de exito
    this.snack.open('El registro fue completado', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    
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


