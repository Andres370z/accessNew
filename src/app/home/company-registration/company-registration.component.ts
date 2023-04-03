import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { CompanyResgistrationService } from 'src/app/service/company-resgistration.service';

export interface companyUserData{
  name: string,
  nit: string,
  telephone: string,
  email: string,
  contact: string,
  departament: string,
  municipality: string,
  address: string,
}
@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {
  departamento = ['Amazonas','Antioquia','Arauca','Atlántico','Bogotá','Bolívar','Boyacá','Caldas',
  'Caquetá','Casanare','Cauca','Cesar','Chocó','Córdoba','Cundinamarca','Guainía','Guaviare','Huila', 
  'La Guajira','Magdalena','Meta','Nariño','Norte de Santander','Putumayo','Quindío','Risaralda',
  'San Andrés y Providencia','Santander','Sucre','Tolima','Valle del Cauca','Vaupés','Vichada']
  displayedColumns: string[] = ['name', 'nit', 'telephone', 'email', 'contact', 'departament', 'municipality', 'address'];
  dataSource: MatTableDataSource<companyUserData>;
  listUser: companyUserData[]=[]
  public form: FormGroup
  response:boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private myFormsBuilder: FormBuilder,
    private companyService: CompanyResgistrationService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.intial()
    
  }
  intial(){
    this.form = this.myFormsBuilder.group({
      name: [Menssage.empty, Validators.compose([Validators.required])],
      nit: [Menssage.empty, Validators.compose([Validators.required])],
      telephone: [Menssage.empty, Validators.compose([Validators.required])],
      email: [Menssage.empty, Validators.compose([Validators.required, Validators.email])],
      contact: [Menssage.empty, Validators.compose([Validators.required])],
      departament: [Menssage.empty, Validators.compose([Validators.required])],
      municipality: [Menssage.empty, Validators.compose([Validators.required])],
      address: [Menssage.empty, Validators.compose([Validators.required])]

    })
    this.loadUsers()
  }
  saveData(){
    //console.log(this.form);
    const save: companyUserData={
      name: this.form.value.name,
      nit: this.form.value.nit,
      telephone: this.form.value.telephone,
      email: this.form.value.email,
      contact: this.form.value.contact,
      departament: this.form.value.departament,
      municipality: this.form.value.municipality,
      address: this.form.value.address
    }
    console.log('Datos optenidos por svaeData ↓');
    console.log(save)
    this.snack.open('Registro Completado', 'Operacion Exitosa',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
    //alert('ingresa un nuevo usuario')
  }
  loadUsers(){
    this.listUser = this.companyService.getUser()
    this.dataSource = new MatTableDataSource(this.listUser)
  }
  clear(){
    this.form.reset()
    this.snack.open('Ingresa un nuevo usuario', 'operación exitosa', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
