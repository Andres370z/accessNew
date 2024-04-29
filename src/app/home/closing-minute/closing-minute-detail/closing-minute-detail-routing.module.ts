import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosingMinuteDetailComponent } from './closing-minute-detail.component';

const routes: Routes = [{ path: '', component: ClosingMinuteDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosingMinuteDetailRoutingModule { }
