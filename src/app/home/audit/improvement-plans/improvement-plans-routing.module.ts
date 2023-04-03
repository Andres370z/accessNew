import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprovementPlansComponent } from './improvement-plans.component';

const routes: Routes = [{ path: '', component: ImprovementPlansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprovementPlansRoutingModule { }
