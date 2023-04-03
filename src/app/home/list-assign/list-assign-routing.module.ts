import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssignComponent } from './list-assign.component';

const routes: Routes = [
  { path: '', component: ListAssignComponent },
  { path: 'assistantList/:token', loadChildren: () => import('./assistant-list/assistant-list.module').then(m => m.AssistantListModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAssignRoutingModule { }
