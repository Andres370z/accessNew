import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemTablesComponent } from './system-tables.component';

const routes: Routes = [
  {path:'',component: SystemTablesComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemTablesRoutingModule { }
