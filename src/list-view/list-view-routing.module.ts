import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './list-view.component';

const routes: Routes = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../list/list.module').then((m) => m.ListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListViewRoutingModule {
  static components = [ListViewComponent];
}
