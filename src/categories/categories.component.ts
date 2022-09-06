import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data
      .getCategories()
      .then((categories: any) => {
        console.log(JSON.stringify(categories.data.categories));
        this.categories = categories.data.categories;
      });
  }
}
