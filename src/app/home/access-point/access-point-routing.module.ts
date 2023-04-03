import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPointComponent } from './access-point.component';

const routes: Routes = [
  {path: '', component: AccessPointComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessPointRoutingModule { }
