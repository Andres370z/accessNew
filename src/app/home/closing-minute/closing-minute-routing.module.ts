import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosingMinuteComponent } from './closing-minute.component';

const routes: Routes = [
  { path: '', component: ClosingMinuteComponent },
  { path: 'closingMinuteDetail/:id', loadChildren: () => import('./closing-minute-detail/closing-minute-detail.module').then(m => m.ClosingMinuteDetailModule) }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosingMinuteRoutingModule { }
