import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoDetailRoutingModule } from './info-detail-routing.module';
import { InfoDetailComponent } from './info-detail.component';
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
import {PlatformModule} from '@angular/cdk/platform';

@NgModule({
  declarations: [
    InfoDetailComponent
  ],
  imports: [
    CommonModule,
    InfoDetailRoutingModule,
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
    MatIconModule,
    PlatformModule
  ]
})
export class InfoDetailModule { }
