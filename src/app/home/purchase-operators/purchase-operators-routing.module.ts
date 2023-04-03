import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOperatorsComponent } from './purchase-operators.component';

const routes: Routes = [{ path: '', component: PurchaseOperatorsComponent }, 
{ path: 'purchaseOperatorsDetail/:token', loadChildren: () => import('./purchase-operators-detail/purchase-operators-detail.module').then(m => m.PurchaseOperatorsDetailModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOperatorsRoutingModule { }
