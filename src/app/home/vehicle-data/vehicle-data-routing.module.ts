import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDataComponent } from './vehicle-data.component';

const routes: Routes = [
  {path: '', component: VehicleDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDataRoutingModule { }
