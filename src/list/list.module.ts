import { NgModule } from '@angular/core';
import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [ListRoutingModule.components],
  imports: [
    SharedModule,
    ListRoutingModule
  ]
})
export class ShopModule { }
