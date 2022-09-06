import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FunctionsService } from './functions.service';
import { User } from 'src/user/user.model';
import { List } from 'src/list/list.model';
import { HttpsCallableResult } from 'firebase/functions';

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
    theme: window.localStorage.getItem('hathaway-home-theme') || 'light',
  };

  private _userData: BehaviorSubject<User> = new BehaviorSubject(
    DataService.newUser
  );
  public userData: Observable<User> = this._userData.asObservable();

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading: Observable<boolean> = this._isLoading.asObservable();

  authUserData: User = DataService.newUser;

  constructor(private functions: FunctionsService) {}

  set newAuthUserData(user: User) {
    this.authUserData = user;
  }

  addUser() {
    this.functions
      .addUser(this.authUserData)
      .then(() => this._userData.next(this.authUserData));
  }

  getUser() {
    this.functions.getUser().then((user: any) => {
      if (user.data === 'no data') {
        this.addUser();
      } else {
        this._userData.next(user.data);
      }
    });
  }

  saveUser(userData: User): void {
    console.log(userData);
    this.functions.editUser(userData);
  }

  updateUser(userDetails: User) {
    this.functions.editUser(userDetails).then(() => {
      this._userData.next(userDetails);
    });
  }

  resetUser() {
    this._userData.next(DataService.newUser);
  }

  updateLoadingStatus(loading: boolean) {
    this._isLoading.next(loading);
  }

  getIndividualItems(filter: string | null = null): Promise<any> {
    return this.functions.getIndividualShoppingListItems(filter);
  }

  editIndividualShoppingListItem(data: any): Promise<HttpsCallableResult> {
    return this.functions.editIndividualShoppingListItem(data);
  }

  addIndividualShoppingListItem(data: any): Promise<HttpsCallableResult> {
    return this.functions.addIndividualShoppingListItem(data);
  }

  deleteIndividualShoppingListItems(ids: string[]): Promise<HttpsCallableResult> {
    return this.functions.deleteIndividualShoppingListItems(ids);
  }

  getIndividualLists(filter: string | null = null): Promise<HttpsCallableResult> {
    return this.functions.getIndividualLists(filter);
  }

  addIndividualList(list: List): Promise<HttpsCallableResult> {
    return this.functions.addIndividualList(list);
  }

  deleteIndividualList(id: string): Promise<HttpsCallableResult> {
    return this.functions.deleteIndividualList(id);
  }

  editIndividualList(list: List): Promise<HttpsCallableResult> {
    return this.functions.updateIndividualList(list);
  }

  getCategories(): Promise<HttpsCallableResult> {
    return this.functions.getCategories();
  }

  addCategories(categories: string[]): Promise<HttpsCallableResult> {
    return this.functions.addCategories(categories);
  }
}
