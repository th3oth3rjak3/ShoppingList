import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
