import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent, FooterComponent],
  imports: [
    SharedModule
  ],
  exports: [ DashboardComponent, NavbarComponent, FooterComponent]
})
export class ComponentsModule { }
