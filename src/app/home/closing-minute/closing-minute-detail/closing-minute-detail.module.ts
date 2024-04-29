import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClosingMinuteDetailRoutingModule } from './closing-minute-detail-routing.module';
import { ClosingMinuteDetailComponent } from './closing-minute-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    ClosingMinuteDetailComponent
  ],
  imports: [
    CommonModule,
    ClosingMinuteDetailRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClosingMinuteDetailModule { }
