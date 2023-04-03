import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementReportsComponent } from './management-reports.component';

const routes: Routes = [{ path: '', component: ManagementReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementReportsRoutingModule { }
