import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAgentsComponent } from './create-agents.component';

const routes: Routes = [{ path: '', component: CreateAgentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAgentsRoutingModule { }
