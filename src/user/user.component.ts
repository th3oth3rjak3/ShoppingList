import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit, OnDestroy {
  userData: User = DataService.newUser;
  sub: Subscription = new Subscription();


  // TODO: Need to figure out how to let the user know that their preferences haven't been saved or just save them automatically.

  constructor(
    public data: DataService
  ) {}

  ngOnInit(): void {
    this.sub = this.data.userData.subscribe((user: User) => {
      this.userData = user;
      console.log(this.userData);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
