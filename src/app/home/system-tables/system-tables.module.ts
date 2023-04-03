import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemTablesRoutingModule } from './system-tables-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SystemTablesComponent } from './system-tables.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [SystemTablesComponent],
  imports: [
    CommonModule,
    SystemTablesRoutingModule,
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
export class SystemTablesModule { }
