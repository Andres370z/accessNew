import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogBooksComponent } from './log-books.component';

const routes: Routes = [{ path: '', component: LogBooksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogBooksRoutingModule { }
