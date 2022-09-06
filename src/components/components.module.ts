import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    BottomSheetComponent,
    ConfirmationDialogComponent,
  ],
  imports: [SharedModule],
  exports: [DashboardComponent, NavbarComponent, FooterComponent],
})
export class ComponentsModule {}
