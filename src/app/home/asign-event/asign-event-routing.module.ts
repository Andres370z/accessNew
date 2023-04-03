import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignEventComponent } from './asign-event.component';

const routes: Routes = [{ path: '', component: AsignEventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignEventRoutingModule { }
