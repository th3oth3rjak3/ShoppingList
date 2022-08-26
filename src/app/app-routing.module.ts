import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemsComponent } from './pages/items/items.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ShopComponent } from './pages/shop/shop.component';
import { StoresComponent } from './pages/stores/stores.component';
import { DataService } from './services/data.service';
import { AuthGuard } from './components/auth.guard';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const data = new DataService();

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Home | ' + data.appName,
  },
  {
    path: 'items',
    component: ItemsComponent,
    canActivate: [AuthGuard],
    title: 'Items | ' + data.appName,
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard],
    title: 'Shop | ' + data.appName,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    title: 'Settings | ' + data.appName,
  },
  {
    path: 'settings/categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
    title: 'Manage Categories | ' + data.appName,
  },
  {
    path: 'settings/stores',
    component: StoresComponent,
    canActivate: [AuthGuard],
    title: 'Manage Stores | ' + data.appName,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
    canActivate: [AuthGuard],
    title: 'Page Not Found | ' + data.appName,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
