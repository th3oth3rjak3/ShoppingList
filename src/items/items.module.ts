import { NgModule } from '@angular/core';
import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  imports: [ItemsRoutingModule, SharedModule],
  declarations: [ItemsRoutingModule.components],
  
})
export class ItemsModule { }
