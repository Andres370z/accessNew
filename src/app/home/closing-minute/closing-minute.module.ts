import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClosingMinuteRoutingModule } from './closing-minute-routing.module';
import { ClosingMinuteComponent } from './closing-minute.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    ClosingMinuteComponent
  ],
  imports: [
    CommonModule,
    ClosingMinuteRoutingModule,
    FullCalendarModule
  ]
})
export class ClosingMinuteModule { }
