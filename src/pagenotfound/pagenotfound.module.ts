import { NgModule } from '@angular/core';
import { PagenotfoundRoutingModule } from './pagenotfound-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [PagenotfoundRoutingModule.components],
  imports: [
    SharedModule,
    PagenotfoundRoutingModule
  ]
})
export class PagenotfoundModule { }
