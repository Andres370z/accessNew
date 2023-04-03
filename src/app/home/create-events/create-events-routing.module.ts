import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventsComponent } from './create-events.component';

const routes: Routes = [{ path: '', component: CreateEventsComponent }, { path: 'listUsers/:id', loadChildren: () => import('./headquarters/headquarters.module').then(m => m.HeadquartersModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEventsRoutingModule { }
