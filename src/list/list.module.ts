import { NgModule } from '@angular/core';
import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ListItemComponent } from 'src/list-item/list-item.component';

@NgModule({
  declarations: [ListRoutingModule.components, ListItemComponent],
  imports: [SharedModule, ListRoutingModule],
})
export class ListModule {}
