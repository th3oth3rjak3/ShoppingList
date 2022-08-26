import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { DataService } from 'src/services/data.service';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('../categories/categories.module').then((m) => m.CategoriesModule),
    canActivate: [AuthGuard],
    title: 'Manage Categories | ' + DataService.appName,
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('../stores/stores.module').then((m) => m.StoresModule),
    canActivate: [AuthGuard],
    title: 'Manage Stores | ' + DataService.appName,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SettingsRoutingModule {
  static components = [SettingsComponent];
}
