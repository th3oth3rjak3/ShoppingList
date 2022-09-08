import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { ConfirmationDialogComponent } from 'src/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogData } from 'src/components/confirmation-dialog/confirmation-dialog-model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  editing: boolean = false;
  addCategoryFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  editCategoryFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  displayedColumns: string[] = ['category', 'edit', 'delete'];
  selectedRow: string = '';

  constructor(private data: DataService, private dialog: MatDialog) {
    this.addCategoryName.setErrors({ notUnique: false });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  get addCategoryName(): FormControl {
    return this.addCategoryFormGroup.get('name') as FormControl;
  }

  get editCategoryName(): FormControl {
    return this.editCategoryFormGroup.get('name') as FormControl;
  }

  beginEditingCategory(category: any) {
    this.editing = true;
    this.addCategoryName.setValue(category);
    this.categories = this.categories.filter(
      (newCategory: any) => newCategory !== category
    );
    this.categoryExists();
  }

  deleteCategory(category: any) {
    // TODO: Confirmation message to user
    this.categories = this.categories.filter(
      (newCategory: string) => newCategory !== category
    );
    this.data.addCategories(this.categories).then(() => this.getCategories());
  }

  categoryExists(): boolean {
    const val = this.addCategoryName.value;
    const exists: boolean = this.categories.includes(val);
    if (exists && val.length) {
      this.addCategoryName.setErrors({ notUnique: true });
    }

    return exists;
  }
  addCategory(form: FormGroupDirective) {
    if (!this.categoryExists()) {
      this.categories.push(this.addCategoryName.value);
      this.data.addCategories(this.categories).then(() => this.getCategories());
      form.resetForm();
    }
  }
  editCategory(form: FormGroupDirective) {
    this.categories.push(this.addCategoryName.value);
    this.data.addCategories(this.categories).then(() => this.getCategories());
    this.editing = false;
    form.resetForm();
  }

  updateSelectedRow(row: any): void {
    if (this.selectedRow === row) {
      this.selectedRow = '';
    } else {
      this.selectedRow = row;
    }
  }

  getCategories(): void {
    this.data.getCategories().then((categories: any) => {
      this.categories = categories.data.categories;
    });
  }

  cancelEditing(form: FormGroupDirective) {
    this.editing = false;
    this.resetForm(form);
    this.getCategories();
  }

  resetForm(form: FormGroupDirective): void {
    if (!this.editing) {
      this.addCategoryFormGroup.reset();
      this.addCategoryName.reset();
      form.resetForm();
    } else {
      this.editCategoryFormGroup.reset();
      this.editCategoryName.reset();
    }
  }

  confirmDelete(category: string): void {
    const data: ConfirmationDialogData = {
      title: `Delete Category?`,
      description: [`Are you sure you wish to delete '${category}'?`],
      confirmButtonText: "Delete",
      denyButtonText: "Cancel"
      }
    const config: MatDialogConfig = {
      data: data,
      autoFocus: true
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    const sub = dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCategory(category);
      }
      sub.unsubscribe();
    });
  }

}
