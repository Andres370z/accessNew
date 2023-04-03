import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateControlRoutingModule } from './template-control-routing.module';
import { TemplateControlComponent } from './template-control.component';


@NgModule({
  declarations: [
    TemplateControlComponent
  ],
  imports: [
    CommonModule,
    TemplateControlRoutingModule
  ]
})
export class TemplateControlModule { }
