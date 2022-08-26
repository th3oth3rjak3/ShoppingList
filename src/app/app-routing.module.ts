import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('../sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
    title: 'Home | ' + DataService.appName,
  },
  {
    path: 'items',
    loadChildren: () =>
      import('../items/items.module').then((m) => m.ItemsModule),
    canActivate: [AuthGuard],
    title: 'Items | ' + DataService.appName,
  },
  {
    path: 'shop',
    loadChildren: () => import('../shop/shop.module').then((m) => m.ShopModule),
    canActivate: [AuthGuard],
    title: 'Shop | ' + DataService.appName,
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
    title: 'Settings | ' + DataService.appName,
  },
  {
    path: '**',
    loadChildren: () => import('../pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule),
    canActivate: [AuthGuard],
    title: 'Page Not Found | ' + DataService.appName,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
