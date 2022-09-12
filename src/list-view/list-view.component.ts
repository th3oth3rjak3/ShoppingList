import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { List } from 'src/list/list.model';
import { AddListBottomSheetData } from 'src/components/bottom-sheet/add-bs-list-data.model';
import { BottomSheetComponent } from 'src/components/bottom-sheet/bottom-sheet.component';
import { EditListBottomSheetData } from 'src/components/bottom-sheet/edit-bs-list-data.model';
import { DeleteListBottomSheetData } from 'src/components/bottom-sheet/delete-bs-list-data.model';
import { Item } from 'src/items/item.model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass'],
})
export class ListViewComponent implements OnInit, AfterContentChecked {
  lists: List[] = [];
  sub: Subscription = new Subscription();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.getIndividualLists();
  }

  ngAfterContentChecked(): void {}

  getIndividualLists(): void {
    this.data.getIndividualLists().then((lists) => {
      this.data.removeDataInFlight('list');
      this.lists = <List[]>lists.data;
    });
  }

  deleteIndividualList(listId: string): void {
    this.data.deleteIndividualList(listId).then(() => {
      this.getIndividualLists();
      this.data.removeDataInFlight('list');
    });
  }

  navigate(path: string): void {
    this.router.navigateByUrl('/lists/' + path);
  }

  openAddListBottomSheet(): void {
    const config = new MatBottomSheetConfig();
    const data: AddListBottomSheetData = {
      type: 'add-list',
    };
    config.data = data;
    config.autoFocus = true;
    let sheet = this._bottomSheet.open(BottomSheetComponent, config);
    const sub = sheet.afterDismissed().subscribe((listData: List) => {
      if (listData) {
        this.data.addIndividualList(listData).then(() => {
          this.getIndividualLists();
          sub.unsubscribe();
          this.data.removeDataInFlight('list');
        });
      }
    });
  }

  openEditListBottomSheet(): void {
    const config = new MatBottomSheetConfig();
    const data: EditListBottomSheetData = {
      type: 'edit-list',
      lists: this.lists,
    };
    config.data = data;
    config.autoFocus = true;
    let sheet = this._bottomSheet.open(BottomSheetComponent, config);
    const sub = sheet.afterDismissed().subscribe((listData: List) => {
      if (listData) {
        this.data.editIndividualList(listData).then(() => {
          this.data.removeDataInFlight('list');
          this.getIndividualLists();
          sub.unsubscribe();
        });
      }
    });
  }

  openDeleteListBottomSheet(): void {
    const config = new MatBottomSheetConfig();
    const data: DeleteListBottomSheetData = {
      type: 'delete-list',
      lists: this.lists,
    };
    config.data = data;
    config.autoFocus = true;
    let sheet = this._bottomSheet.open(BottomSheetComponent, config);
    const sub = sheet.afterDismissed().subscribe((id: string) => {
      if (id) {
        this.lists = this.lists.filter((list: List) => list._id !== id);
        this.data
          .getIndividualItems(id)
          .then((items) => {
            this.data.removeDataInFlight('item');
            const theseItems = items.data.filter(
              (item: Item) => item.list === id
            );
            let itemIdsToDelete: string[] = [];
            theseItems.forEach((item: Item) => {
              if (item.list === id) {
                itemIdsToDelete.push(item._id);
              }
            });
            if (itemIdsToDelete.length) {
              this.data.deleteIndividualShoppingListItems(itemIdsToDelete).then(() => {
                this.data.removeDataInFlight('item');
              });
            }
          })
          .then(() => {
            this.deleteIndividualList(id);
          });
        sub.unsubscribe();
      }
    });
  }
}
