import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { PagesRoutes } from './pages.routing';

import { LoginComponent } from './login/login.component';
import { LoginClientComponent } from './loginClient/loginClient.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    LoginClientComponent,
    TwoStepVerificationComponent
  ]
})

export class PagesModule {}
