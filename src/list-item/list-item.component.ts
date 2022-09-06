import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from 'src/list/list-item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit {

  @Input() listItem! : ListItem;
  constructor() { }

  ngOnInit(): void {
  }

  strikethrough(): void {
    this.listItem.strikethrough = !this.listItem.strikethrough;
  }

  togglePurchase(): void {
    this.listItem.purchased = !this.listItem.purchased;
  }

}
