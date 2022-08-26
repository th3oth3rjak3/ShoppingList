import { Component, OnInit } from '@angular/core';
import { Auth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  appName: string = this.data.appName;

  constructor(
    private data: DataService,
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
