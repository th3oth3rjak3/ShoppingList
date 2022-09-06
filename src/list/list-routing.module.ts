import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [{
  path: '',
  component: ListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule, CommonModule]
})
export class ListRoutingModule {
  static components = [ListComponent];
 }
