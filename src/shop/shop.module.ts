import { NgModule } from '@angular/core';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [ShopRoutingModule.components],
  imports: [
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
