import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOperatorsRoutingModule } from './purchase-operators-routing.module';
import { PurchaseOperatorsComponent } from './purchase-operators.component';


@NgModule({
  declarations: [
    PurchaseOperatorsComponent
  ],
  imports: [
    CommonModule,
    PurchaseOperatorsRoutingModule
  ]
})
export class PurchaseOperatorsModule { }
