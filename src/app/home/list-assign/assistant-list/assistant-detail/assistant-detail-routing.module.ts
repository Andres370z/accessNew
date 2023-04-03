import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantDetailComponent } from './assistant-detail.component';

const routes: Routes = [{ path: '', component: AssistantDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantDetailRoutingModule { }
