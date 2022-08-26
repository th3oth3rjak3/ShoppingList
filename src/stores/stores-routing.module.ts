import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresComponent } from './stores.component';
import { AuthGuard } from 'src/app/auth.guard';
import { DataService } from 'src/services/data.service';

const routes: Routes = [{
  path: '',
  component: StoresComponent,
  canActivate: [AuthGuard],
  title: "Stores | " + DataService.appName,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule {
  static components = [StoresComponent];
 }
