import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateControlComponent } from './template-control.component';

const routes: Routes = [{ path: '', component: TemplateControlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateControlRoutingModule { }
