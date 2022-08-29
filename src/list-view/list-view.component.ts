import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass']
})
export class ListViewComponent implements OnInit {

  lists: any[] = [{path: "1234", title: "Fake List"}];

  constructor() { }

  ngOnInit(): void {
  }

}
