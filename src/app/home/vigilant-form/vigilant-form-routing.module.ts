import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VigilantFormComponent } from './vigilant-form.component';

const routes: Routes = [
  {path:'',component:VigilantFormComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VigilantFormRoutingModule { }
