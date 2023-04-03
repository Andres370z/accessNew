import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantDetailRoutingModule } from './assistant-detail-routing.module';
import { AssistantDetailComponent } from './assistant-detail.component';
import { LightgalleryModule } from 'lightgallery/angular/13';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    AssistantDetailComponent
  ],
  imports: [
    CommonModule,
    AssistantDetailRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    LightgalleryModule
  ]
})
export class AssistantDetailModule { }
