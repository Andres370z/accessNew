import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoVehicleDetailComponent } from './info-vehicle-detail.component';

const routes: Routes = [{ path: '', component: InfoVehicleDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoVehicleDetailRoutingModule { }
