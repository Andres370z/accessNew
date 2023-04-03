import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGuestComponent } from './create-guest.component';

const routes: Routes = [{ path: '', component: CreateGuestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateGuestRoutingModule { }
