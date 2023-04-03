import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkLoadComponent } from './bulk-load.component';

const routes: Routes = [{ path: '', component: BulkLoadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkLoadRoutingModule { }
