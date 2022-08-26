import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { FunctionsService } from 'src/services/functions.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  appName: string = DataService.appName;

  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit(): void {}

}
