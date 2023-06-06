import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoDetailComponent } from './info-detail.component';

const routes: Routes = [{ path: '', component: InfoDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoDetailRoutingModule { }
