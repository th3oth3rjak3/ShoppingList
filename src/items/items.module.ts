import { NgModule } from '@angular/core';
import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [ItemsRoutingModule.components],
  imports: [ItemsRoutingModule, SharedModule],
})
export class ItemsModule {}
