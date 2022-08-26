import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [SettingsRoutingModule.components],
  imports: [SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
