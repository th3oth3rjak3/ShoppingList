import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { FunctionsService } from 'src/services/functions.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass'],
})
export class ItemsComponent implements OnInit, AfterViewInit, AfterContentInit {
  // Form Fields
  itemNameControl: FormControl = new FormControl(null, [Validators.required]);
  categoryControl: FormControl = new FormControl(null, [Validators.required]);
  subcategoryControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);

  // Form Group for Add Item
  itemFormGroup: FormGroup = new FormGroup({
    name: this.itemNameControl,
    category: this.categoryControl,
    subcategory: this.subcategoryControl,
  });

  // Backing Variables
  IndividualItems: any[] = [];
  selectedRow: any = null;
  editing: boolean = false;
  editingItemId: string = '';

  // Column ID's for the table
  displayedColumns: string[] = [
    'item-name',
    'category',
    'subcategory',
    'edit',
    'delete',
  ];

  // TODO: get categories from database
  categories: string[] = ['Groceries', 'Automotive', 'Beauty'];
  subcategories: any = {
    Groceries: ['Dairy', 'Produce', 'Beverages'],
    Automotive: ['Other Automotive'],
    Beauty: ['Hair Products', 'Other Beauty'],
  };

  constructor(private auth: AuthService, private functions: FunctionsService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngAfterContentInit(): void {
      this.getIndividualShoppingListItems('');
  }

  resetForm(formDirective: FormGroupDirective): void {
    this.itemFormGroup.reset();
    this.itemFormGroup.controls['name'].reset();
    this.itemFormGroup.controls['category'].reset();
    this.itemFormGroup.controls['subcategory'].reset();
    formDirective.resetForm();
  }

  addItem(formDirective: FormGroupDirective): void {
    const newItem = {
      name: this.itemNameControl.value,
      category: this.categoryControl.value,
      subcategory: this.subcategoryControl.value,
    };
    this.functions
      .addIndividualShoppingListItem(newItem)
      .then(() => this.getIndividualShoppingListItems(''));
    this.resetForm(formDirective);
  }

  getIndividualShoppingListItems(filter: string = ''): void {
    
    if (this.auth.isLoggedIn) {
      this.functions.getIndividualShoppingListItems().then((result: any) => {
        this.IndividualItems = result.data.filter(
          (item: any) => item._id !== filter
        );
      });
    } else {
      console.error('You must be logged in to use this feature.');
    }
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
    this.subcategoryControl.setValue(item.subcategory);
    this.editingItemId = item._id;
    this.getIndividualShoppingListItems(item._id);
  }

  cancelEditing(formDirective: FormGroupDirective): void {
    this.editing = false;
    this.editingItemId = '';
    this.getIndividualShoppingListItems('');
    this.resetForm(formDirective);
  }

  editIndividualItem(formDirective: FormGroupDirective): void {
    // TODO: update this.
    this.editing = false;
    const data = {
      id: this.editingItemId,
      document: {
        name: this.itemNameControl.value,
        category: this.categoryControl.value,
        subcategory: this.subcategoryControl.value,
      },
    };
    this.functions.editIndividualShoppingListItem(data).then(() => {
      this.editingItemId = '';
      this.resetForm(formDirective);
      this.getIndividualShoppingListItems('');
    });
  }

  deleteIndividualItem(item: any): void {
    if (confirm('Are you sure you wish to delete ' + item.name + '?')) {
      this.functions
        .deleteIndividualShoppingListItem(item._id)
        .then(() => this.getIndividualShoppingListItems(''));
    }
  }
}
