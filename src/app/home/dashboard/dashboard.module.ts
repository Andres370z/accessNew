import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard.component';
import { CustomerGraphsComponent } from './customer-graphs/customer-graphs.component';
import { GraphicsAdminComponent } from './graphics-admin/graphics-admin.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CustomerGraphsComponent,
    GraphicsAdminComponent
  ],
  imports: [
    CommonModule,
    DashboardModule
  ]
})
export class DashboardModule { }
