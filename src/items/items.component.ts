import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
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
  editingItemId: string = '';

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

  constructor(private auth: AuthService, private data: DataService) {}

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
      console.log(JSON.stringify(this.IndividualItems));
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
    this.editingItemId = item._id;
    this.getIndividualShoppingListItems(item._id);
  }

  cancelEditing(formDirective: FormGroupDirective): void {
    this.editing = false;
    this.editingItemId = '';
    this.getIndividualShoppingListItems();
    this.resetForm(formDirective);
  }

  editIndividualItem(formDirective: FormGroupDirective): void {
    this.editing = false;
    const data: Item = {
      _id: this.editingItemId,
      uid: this.IndividualItems.filter(
        (item: Item) => item._id === this.editingItemId
      )[0].uid,
      name: this.itemNameControl.value,
      category: this.categoryControl.value,
      list: this.listControl.value,
    };
    this.data.editIndividualShoppingListItem(data).then(() => {
      this.editingItemId = '';
      this.resetForm(formDirective);
      this.getIndividualShoppingListItems('');
    });
  }

  deleteIndividualItem(item: any): void {
    // TODO: Change this to the modal confirmation dialog
    if (confirm('Are you sure you wish to delete ' + item.name + '?')) {
      this.data
        .deleteIndividualShoppingListItems([item._id])
        .then(() => this.getIndividualShoppingListItems(''));
    }
  }
}
