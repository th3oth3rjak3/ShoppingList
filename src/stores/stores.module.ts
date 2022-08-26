import { NgModule } from '@angular/core';
import { StoresRoutingModule } from './stores-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [StoresRoutingModule.components],
  imports: [
    SharedModule,
    StoresRoutingModule
  ]
})
export class StoresModule { }
