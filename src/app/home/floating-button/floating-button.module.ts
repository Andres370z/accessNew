import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloatingButtonComponent } from './floating-button.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [FloatingButtonComponent],
  exports: [FloatingButtonComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
})
export class FloatingButtonModule { }
