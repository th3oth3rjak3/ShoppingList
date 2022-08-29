import { NgModule } from '@angular/core';
import { ListViewRoutingModule } from './list-view-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [ListViewRoutingModule.components],
  imports: [
    ListViewRoutingModule,
    SharedModule
  ]
})
export class ListViewModule { }
