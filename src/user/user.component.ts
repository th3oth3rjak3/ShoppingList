import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { FunctionsService } from 'src/services/functions.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit, OnDestroy {
  userData: User = DataService.newUser;
  sub: Subscription = new Subscription();

  constructor(
    private functions: FunctionsService,
    private authService: AuthService,
    public data: DataService
  ) {}

  ngOnInit(): void {
    this.sub = this.data.userData.subscribe((user: User) => {
      this.userData = user;
      console.log(this.userData);
    });

    this.data.getUser();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
