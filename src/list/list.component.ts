import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { List } from './list.model';
import { Item } from 'src/items/item.model';
import { ListItem } from './list-item.model';
import { BottomSheetComponent } from 'src/components/bottom-sheet/bottom-sheet.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { EditItemBottomSheetData } from 'src/components/bottom-sheet/edit-bs-item-data.model';
import { DeleteItemBottomSheetData } from 'src/components/bottom-sheet/delete-bs-item-data.model';
import { AddItemBottomSheetData } from 'src/components/bottom-sheet/add-bs-item-data.model';
import { ConfirmationDialogData } from 'src/components/confirmation-dialog/confirmation-dialog-model';
import { ConfirmationDialogComponent } from 'src/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
  list: List | null = null;
  items: Item[] = [];
  listItems: ListItem[] = [];
  listId: string = '';
  displayCategories: string[] = [];
  categories: string[] = [];
  lists: List[] = [];

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.listId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.data.getIndividualLists().then((lists: any) => {
      this.lists = <List[]>lists.data;
      this.list = this.lists.filter((list) => list._id === this.listId)[0];
      this.data.removeDataInFlight('list');
    });
    this.data.getCategories().then((categories: any) => {
      if (categories.data.categories.length) {
        this.categories = categories.data.categories;
        this.data.removeDataInFlight('category');
      }
    });
    this.getItems();
  }

  filteredItems(category: string): ListItem[] {
    let filteredListItems = this.listItems.filter(
      (listItem: ListItem) => listItem.category === category
    );

    filteredListItems = filteredListItems.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    return filteredListItems;
  }

  toListItems(items: Item[]): ListItem[] {
    this.displayCategories = [];
    let listItems: ListItem[] = [];
    items.forEach((item: Item) => {
      const thisListItem: ListItem = {
        uid: item.uid,
        _id: item._id,
        name: item.name,
        category: item.category,
        list: item.list,
        purchased: false,
        strikethrough: false,
      };
      listItems.push(thisListItem);
      if (!this.displayCategories.includes(thisListItem.category)) {
        this.displayCategories.push(thisListItem.category);
      }
    });
    this.displayCategories = this.displayCategories.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return listItems;
  }

  getItems(): void {
    this.data.getIndividualItems(this.listId).then((items) => {
      this.items = <Item[]>items.data;
      this.listItems = this.toListItems(this.items);
      this.data.removeDataInFlight('item');
    });
  }

  finishShopping(): void {
    const deletedIds: string[] = [];
    this.listItems.map((listItem: ListItem) => {
      listItem.purchased ? deletedIds.push(listItem._id) : null;
    });
    if (deletedIds.length) {
      this.data.deleteIndividualShoppingListItems(deletedIds).then(() => {
        this.getItems();
        this.data.removeDataInFlight('item');
      });
    }
  }

  openFinishedDialog(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogData: ConfirmationDialogData = {
      title: 'Finished Shopping?',
      description: [
        'Are you sure you want to finish shopping?',
        'WARNING: This will delete all checked items!',
      ],
      confirmButtonText: 'Finished',
      denyButtonText: 'Cancel',
    };
    dialogConfig.data = dialogData;
    dialogConfig.autoFocus = true;
    const result = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    result.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.finishShopping();
      }
    });
  }

  openEditItemBottomSheet(): void {
    const config = new MatBottomSheetConfig();
    const data: EditItemBottomSheetData = {
      type: 'edit-item',
      categories: this.categories,
      items: this.listItems,
      lists: this.lists,
    };
    config.data = data;
    config.autoFocus = true;
    let sheet = this.bottomSheet.open(BottomSheetComponent, config);
    const sub = sheet.afterDismissed().subscribe((itemData: Item) => {
      if (itemData) {
        this.data.editIndividualShoppingListItem(itemData).then(() => {
          this.getItems();
          sub.unsubscribe();
          this.data.removeDataInFlight('item');
        });
      } else {
        sub.unsubscribe();
      }
    });
  }
  openDeleteItemBottomSheet(): void {
    const config = new MatBottomSheetConfig();
    const data: DeleteItemBottomSheetData = {
      type: 'delete-item',
      items: this.listItems,
    };
    config.data = data;
    config.autoFocus = true;
    let sheet = this.bottomSheet.open(BottomSheetComponent, config);
    const sub = sheet.afterDismissed().subscribe((id: string) => {
      if (id) {
        this.data.deleteIndividualShoppingListItems([id]).then(() => {
          this.getItems();
          sub.unsubscribe();
          this.data.removeDataInFlight('item');
        });
      }
    });
  }

  openAddItemBottomSheet(): void {
    const config = new MatBottomSheetConfig();
    const data: AddItemBottomSheetData = {
      type: 'add-item',
      categories: this.categories,
      lists: this.lists,
    };
    config.data = data;
    config.autoFocus = true;
    let sheet = this.bottomSheet.open(BottomSheetComponent, config);
    const sub = sheet.afterDismissed().subscribe((itemData: Item) => {
      if (itemData) {
        this.data.addIndividualShoppingListItem(itemData).then(() => {
          this.getItems();
          sub.unsubscribe();
          this.data.removeDataInFlight('item');
        });
      }
    });
  }
}
