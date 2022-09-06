import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { Item } from 'src/items/item.model';
import { ListItem } from 'src/list/list-item.model';
import { List } from 'src/list/list.model';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.sass'],
})
export class BottomSheetComponent implements OnInit {
  data: any;

  // for adding a new item
  addItemFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    list: new FormControl(null, Validators.required),
  });

  // For editing items
  editItemFormGroup: FormGroup = new FormGroup({
    itemToEdit: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    list: new FormControl(null, Validators.required),
  });

  // for deleting items
  deleteItemFormGroup: FormGroup = new FormGroup({
    itemToDelete: new FormControl(null, Validators.required),
  });

  // for adding a new list
  addListFormGroup: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
  });

  // For editing an existing list name
  editListFormGroup: FormGroup = new FormGroup({
    listToEdit: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
  });

  deleteListFormGroup: FormGroup = new FormGroup({
    listToDelete: new FormControl(null, Validators.required),
  });

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: any
  ) {
    this.data = data;
  }

  ngOnInit(): void {}

  editItemSelectionChanged(): void {
    const itemId = this.editItemFormGroup.controls['itemToEdit'].value;
    const item = this.data.items.filter(
      (item: ListItem) => item._id === itemId
    )[0];
    if (item) {
      this.editItemFormGroup.controls['name'].setValue(item.name);
      this.editItemFormGroup.controls['category'].setValue(item.category);
      this.editItemFormGroup.controls['list'].setValue(item.list);
    }
  }

  get addName(): FormControl {
    return this.addItemFormGroup.get('name') as FormControl;
  }

  get addCategory(): FormControl {
    return this.addItemFormGroup.get('category') as FormControl;
  }

  get addList(): FormControl {
    return this.addItemFormGroup.get('list') as FormControl;
  }

  get itemToEdit(): FormControl {
    return this.editItemFormGroup.get('itemToEdit') as FormControl;
  }

  get editItemName(): FormControl {
    return this.editItemFormGroup.get('name') as FormControl;
  }

  get editCategory(): FormControl {
    return this.editItemFormGroup.get('category') as FormControl;
  }

  get editList(): FormControl {
    return this.editItemFormGroup.get('list') as FormControl;
  }

  get itemToDelete(): FormControl {
    return this.deleteItemFormGroup.get('itemToDelete') as FormControl;
  }

  get addListName(): FormControl {
    return this.addListFormGroup.get('title') as FormControl;
  }

  get listToEdit(): FormControl {
    return this.editListFormGroup.get('listToEdit') as FormControl;
  }

  get editListName(): FormControl {
    return this.editListFormGroup.get('title') as FormControl;
  }

  get listToDelete(): FormControl {
    return this.deleteListFormGroup.get('listToDelete') as FormControl;
  }

  submitItemEdits(): void {
    if (this.editItemFormGroup.valid) {
      const item: ListItem = this.data.items.filter(
        (item: ListItem) =>
          item._id === this.editItemFormGroup.get('itemToEdit')?.value
      )[0];
      const itemData: Item = {
        _id: item._id,
        uid: item.uid,
        name: this.editItemFormGroup?.get('name')?.value,
        list: this.editItemFormGroup?.get('list')?.value,
        category: this.editItemFormGroup?.get('category')?.value,
      };

      this._bottomSheetRef.dismiss(itemData);
    }
  }

  submitItemDelete(): void {
    if (this.deleteItemFormGroup.valid) {
      this._bottomSheetRef.dismiss(
        this.deleteItemFormGroup.get('itemToDelete')?.value ?? null
      );
    }
  }

  submitAddItem(): void {
    if (this.addItemFormGroup.valid) {
      const newItem: Item = {
        _id: '',
        uid: '',
        name: this.addItemFormGroup.get('name')?.value,
        category: this.addItemFormGroup.get('category')?.value,
        list: this.addItemFormGroup.get('list')?.value,
      };
      this._bottomSheetRef.dismiss(newItem);
    }
  }

  submitAddList(): void {
    if (this.addListFormGroup.valid) {
      const newList: List = {
        _id: '',
        uid: '',
        title: this.addListFormGroup.get('title')?.value,
      };
      this._bottomSheetRef.dismiss(newList);
    }
  }

  submitListEdits() {
    if (this.editListFormGroup.valid) {
      const list: List = this.data.lists.filter(
        (list: List) =>
          list._id === this.editListFormGroup.get('listToEdit')?.value
      )[0];
      const editedList: List = {
        _id: list._id,
        uid: list.uid,
        title: this.editListFormGroup.get('title')?.value,
      };
      this._bottomSheetRef.dismiss(editedList);
    }
  }

  editListSelectionChanged(): void {
    const listId = this.editListFormGroup.controls['listToEdit'].value;
    const list = this.data.lists.filter((list: List) => list._id === listId)[0];
    if (list) {
      this.editListFormGroup.controls['title'].setValue(list.title);
    }
  }

  submitListDelete(): void {
    if (this.deleteListFormGroup.get('listToDelete')?.valid) {
      this._bottomSheetRef.dismiss(
        this.deleteListFormGroup.get('listToDelete')?.value
      );
    }
  }
}
