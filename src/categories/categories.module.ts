import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [CategoriesRoutingModule.components],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule {}
