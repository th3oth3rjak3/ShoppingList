import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationDialogData } from 'src/components/confirmation-dialog/confirmation-dialog-model';
import { ConfirmationDialogComponent } from 'src/components/confirmation-dialog/confirmation-dialog.component';
import { List } from 'src/list/list.model';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { Item } from './item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass'],
})
export class ItemsComponent implements OnInit, AfterViewInit {
  // Form Fields
  itemNameControl: FormControl = new FormControl(null, [Validators.required]);
  categoryControl: FormControl = new FormControl(null, [Validators.required]);
  listControl: FormControl = new FormControl(null, [Validators.required]);

  // Form Group for Add Item
  itemFormGroup: FormGroup = new FormGroup({
    name: this.itemNameControl,
    category: this.categoryControl,
    list: this.listControl,
  });

  // Backing Variables
  IndividualItems: Item[] = [];
  selectedRow: any = null;
  editing: boolean = false;
  editingItem: Item = { _id: '', uid: '', name: '', category: '', list: '' };

  // Column ID's for the table
  displayedColumns: string[] = [
    'item-name',
    'category',
    'list',
    'edit',
    'delete',
  ];

  // Subscriptions
  itemsSub: Subscription = new Subscription();
  categories: string[] = [];
  lists: List[] = [];

  constructor(private data: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.data.updateLoadingStatus(true);
    this.getIndividualShoppingListItems();
    this.data.getIndividualLists().then((lists) => {
      this.lists = <any[]>lists.data;
    });
    this.data
      .getCategories()
      .then(
        (categories: any) => (this.categories = categories.data.categories)
      );
  }

  ngAfterContentInit(): void {}

  ngAfterViewInit(): void {
    this.data.updateLoadingStatus(false);
  }

  resetForm(formDirective: FormGroupDirective): void {
    this.itemFormGroup.reset();
    this.itemFormGroup.controls['name'].reset();
    this.itemFormGroup.controls['category'].reset();
    this.itemFormGroup.controls['list'].reset();
    formDirective.resetForm();
  }

  listName(id: string): string {
    const theList = this.lists?.filter((list) => list?._id === id)[0]?.title;
    return theList ?? '';
  }

  addItem(formDirective: FormGroupDirective): void {
    const newItem: Item = {
      _id: '',
      uid: '',
      name: this.itemNameControl.value,
      category: this.categoryControl.value,
      list: this.listControl.value,
    };
    this.data
      .addIndividualShoppingListItem(newItem)
      .then(() => this.getIndividualShoppingListItems());
    this.resetForm(formDirective);
  }

  getIndividualShoppingListItems(filter: string | null = null): void {
    this.data.getIndividualItems(filter).then((result: any) => {
      this.IndividualItems = result.data;
    });
  }

  updateSelectedRow(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  beginEditingIndividualItem(item: any): void {
    this.editing = true;
    this.itemNameControl.setValue(item.name);
    this.categoryControl.setValue(item.category);
    this.listControl.setValue(item.list);
    this.editingItem = item;
    this.IndividualItems = this.IndividualItems.filter(
      (thisItem: Item) => thisItem._id !== item._id
    );
  }

  cancelEditing(formDirective: FormGroupDirective): void {
    this.editing = false;
    this.editingItem._id = '';
    this.getIndividualShoppingListItems();
    this.resetForm(formDirective);
  }

  editIndividualItem(formDirective: FormGroupDirective): void {
    const data: Item = {
      _id: this.editingItem._id,
      uid: this.editingItem.uid,
      name: this.itemNameControl.value,
      category: this.categoryControl.value,
      list: this.listControl.value,
    };
    this.data.editIndividualShoppingListItem(data).then(() => {
      this.editingItem._id = '';
      this.resetForm(formDirective);
      this.getIndividualShoppingListItems('');
      this.editing = false;
    });
  }

  deleteIndividualItem(item: Item): void {
    const data: ConfirmationDialogData = {
      title: 'Delete Item?',
      description: [`Are you sure you wish to delete '${item.name}'?`],
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
    };
    const config: MatDialogConfig = {
      data: data,
      autoFocus: true,
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    const sub = dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.IndividualItems = this.IndividualItems.filter(
          (thisItem: Item) => thisItem._id !== item._id
        );
        this.data
          .deleteIndividualShoppingListItems([item._id])
          .then(() => this.getIndividualShoppingListItems(''));
      }
      sub.unsubscribe();
    });
  }
}
