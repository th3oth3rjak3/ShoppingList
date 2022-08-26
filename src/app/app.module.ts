import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

// My Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ItemsComponent } from './pages/items/items.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StoresComponent } from './pages/stores/stores.component';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FunctionsService } from './services/functions.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagenotfoundComponent,
    HomeComponent,
    FooterComponent,
    SettingsComponent,
    ItemsComponent,
    ShopComponent,
    CategoriesComponent,
    StoresComponent,
    SignInComponent,
    DashboardComponent,
  ],
  imports: [
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, AuthService, FunctionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
