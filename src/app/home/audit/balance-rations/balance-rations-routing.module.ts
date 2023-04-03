import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceRationsComponent } from './balance-rations.component';

const routes: Routes = [{ path: '', component: BalanceRationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRationsRoutingModule { }
