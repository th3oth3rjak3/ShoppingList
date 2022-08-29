import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { DataService } from 'src/services/data.service';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    title: "Settings | " + DataService.appName,
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('../categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('../stores/stores.module').then((m) => m.StoresModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SettingsRoutingModule {
  static components = [SettingsComponent];
}
