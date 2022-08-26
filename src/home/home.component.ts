import { Component, OnInit } from '@angular/core';
import { Auth } from 'firebase/auth';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { FunctionsService } from 'src/services/functions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  appName: string = DataService.appName;

  constructor(
    private functions: FunctionsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  testFirebaseFunctions(): void {
    this.getHello();
  }

  getHello(): void {
    const user = this.auth.GetUser();
    if (user) {
      this.functions
        .getHello(user.displayName)
        .then((result) => console.log('helloWorld: ' + result.data));
    } else {
      console.error('You must be logged in to use this feature.');
    }
  }
}
