import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOperatorsDetailComponent } from './purchase-operators-detail.component';

const routes: Routes = [{ path: '', component: PurchaseOperatorsDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOperatorsDetailRoutingModule { }
