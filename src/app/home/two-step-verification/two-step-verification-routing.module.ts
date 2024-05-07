import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoStepVerificationComponent } from './two-step-verification.component';

const routes: Routes = [{path: '', component: TwoStepVerificationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwoStepVerificationRoutingModule { }
