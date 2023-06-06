import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDataComponent } from './vehicle-data.component';

const routes: Routes = [
  {path: '', component: VehicleDataComponent},
  { path: 'infoVehicleDetail/:id', loadChildren: () => import('./info-vehicle-detail/info-vehicle-detail.module').then(m => m.InfoVehicleDetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDataRoutingModule { }
