import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginClientComponent } from './loginClient/loginClient.component';
import { TwoStepVerificationComponent } from '../home/two-step-verification/two-step-verification.component';

export const PagesRoutes: Routes = [
    { 
        path: '', 
        redirectTo: 'login',
        pathMatch: 'full'
      },  
    {
        path: 'login',
        children: [ {
            path: '',
            component: LoginComponent
        }]
    },
    {
        path: 'loginClient/:id',
        children: [ {
            path: '',
            component: LoginClientComponent
        }]
    },
    {
        path: 'verification',
        children: [ {
            path: '',
            component: TwoStepVerificationComponent
        }]
    }
];
