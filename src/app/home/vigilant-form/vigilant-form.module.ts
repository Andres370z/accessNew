import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VigilantFormRoutingModule } from './vigilant-form-routing.module'; 
import { VigilantFormComponent } from './vigilant-form.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [VigilantFormComponent],
  imports: [
    CommonModule,
    VigilantFormRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatIconModule
    
  ]
})
export class VigilantFormModule { }
