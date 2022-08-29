import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from 'src/list/list.component';
import { ListViewComponent } from './list-view.component';

const routes: Routes = [
  { path: '', component: ListViewComponent },
  { path: ':id', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListViewRoutingModule {
  static components = [ListViewComponent];
}
