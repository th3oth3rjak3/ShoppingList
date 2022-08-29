import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FunctionsService } from 'src/services/functions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

  constructor(
    private functions: FunctionsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}
}
