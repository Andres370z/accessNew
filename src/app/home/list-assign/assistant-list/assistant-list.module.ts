import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantListRoutingModule } from './assistant-list-routing.module';
import { AssistantListComponent } from './assistant-list.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AssistantListComponent
  ],
  imports: [
    CommonModule,
    AssistantListRoutingModule,
    FullCalendarModule
  ]
})
export class AssistantListModule { }
