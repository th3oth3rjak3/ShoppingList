import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FunctionsService } from './functions.service';
import { User } from 'src/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  static appName: string = 'Listless';
  static newUser: User = {
    uid: '',
    phone: '',
    email: '',
    photoUrl: '',
    name: '',
    theme: 'light',
  }

  private behaviorSubject: BehaviorSubject<User> = new BehaviorSubject(DataService.newUser);
  public readonly userData: Observable<User> = this.behaviorSubject.asObservable();

  constructor(
    private functions: FunctionsService,
    private authService: AuthService
  ) {}

  // addUser() {
  //   const userData = this.authService.userData;
  //   if (userData) {
  //     const user = {
  //       uid: userData.uid,
  //       name: userData.displayName,
  //       email: userData.email,
  //       phone: userData.phoneNumber,
  //       photoUrl: userData.photoURL,
  //       theme: localStorage.getItem('hathaway-home-theme') || 'light',
  //     };
  //     this.functions.addUser(user).then(() => (this.behaviorSubject.next(user)));
  //   }
  // }

  getUser() {
    this.functions.getUser().then((user: any) => {
      this.behaviorSubject.next(user.data);
      // if (!user.data) {
      //   this.addUser();
      // } else {
      //   DataService.userData = user.data;
      // }
    });
  }

  saveTheme(theme: string): void {
    window.localStorage.setItem('hathaway-home-theme', theme);
    this.functions.editUser({theme: theme}).then(() => {
      this.getUser();
    });
  }

  getTheme(): string {
    let theme = window.localStorage.getItem('hathaway-home-theme');
    if (!theme) {
      theme = 'light';
    }
    return theme;
  }
}
