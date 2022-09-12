import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from 'src/components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';

// Services
import { DataService } from 'src/services/data.service';
import { FunctionsService } from 'src/services/functions.service';
import { AuthService } from 'src/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [DataService, AuthService, FunctionsService, AuthGuard],
  exports: [ComponentsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
