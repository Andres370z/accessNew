import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoStepVerificationRoutingModule } from './two-step-verification-routing.module';
import { TwoStepVerificationComponent } from './two-step-verification.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TwoStepVerificationComponent],
  imports: [
    CommonModule,
    TwoStepVerificationRoutingModule,
    ReactiveFormsModule
  ]
})
export class TwoStepVerificationModule { }
