import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAssignRoutingModule } from './list-assign-routing.module';
import { ListAssignComponent } from './list-assign.component';


@NgModule({
  declarations: [
    ListAssignComponent
  ],
  imports: [
    CommonModule,
    ListAssignRoutingModule
  ]
})
export class ListAssignModule { }
