import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    redirectTo: 'content',
    pathMatch: 'full'
  }, 
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: 'createClients', loadChildren: () => import('./create-events/create-events.module').then(m => m.CreateEventsModule) },
  { path: 'createGuest', loadChildren: () => import('./create-guest/create-guest.module').then(m => m.CreateGuestModule) },
  { path: 'assignInstitution', loadChildren: () => import('./asign-event/asign-event.module').then(m => m.AsignEventModule) },
  { path: 'createSupervisor', loadChildren: () => import('./create-agents/create-agents.module').then(m => m.CreateAgentsModule) },
  { path: 'createOperator', loadChildren: () => import('./bulk-load/bulk-load.module').then(m => m.BulkLoadModule) },
  { path: 'content', loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
  { path: 'uploadImages', loadChildren: () => import('./upload-images/upload-images.module').then(m => m.UploadImagesModule) },
  { path: 'logsUsers', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
  { path: 'listRecordsMade', loadChildren: () => import('./list-assign/list-assign.module').then(m => m.ListAssignModule) },
  { path: 'purchaseOperators', loadChildren: () => import('./purchase-operators/purchase-operators.module').then(m => m.PurchaseOperatorsModule) },
  { path: 'managementReports', loadChildren: () => import('./audit/management-reports/management-reports.module').then(m => m.ManagementReportsModule) },
  { path: 'improvementPlans', loadChildren: () => import('./audit/improvement-plans/improvement-plans.module').then(m => m.ImprovementPlansModule) },
  { path: 'balanceRations', loadChildren: () => import('./audit/balance-rations/balance-rations.module').then(m => m.BalanceRationsModule) },
  { path: 'templateControl', loadChildren: () => import('./audit/template-control/template-control.module').then(m => m.TemplateControlModule) },
  { path: 'documentManagement', loadChildren: () => import('./audit/document-management/document-management.module').then(m => m.DocumentManagementModule) },
  //ANDRES RANGEL
  //Ruta vigilante
  {path: 'customerRegistration', loadChildren: () =>import ('./vigilant-form/vigilant-form.module').then(m => m.VigilantFormModule)},
  //Ruta Tablas del sistema
  {path: 'systemTables', loadChildren: () => import ('./system-tables/system-tables.module').then(m=> m.SystemTablesModule)},
  //Ruta para el Registro de empresa/cliente
  {path: 'companyRegistration', loadChildren: () => import ('./company-registration/company-registration.module').then(m=> m.CompanyRegistrationModule)},
  //Ruta para el punto de acceso
  {path: 'accessPoint', loadChildren: () => import ('./access-point/access-point.module').then(m=>m.AccessPointModule)},
  //Ruta para los datos del vehiculo registrado
  {path: 'vehicleRegistration', loadChildren: ()=>import('./vehicle-data/vehicle-data.module').then(m=> m.VehicleDataModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
