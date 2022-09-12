import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { FunctionsService } from './functions.service';
import { User } from 'src/user/user.model';
import { List } from 'src/list/list.model';
import { HttpsCallableResult } from 'firebase/functions';

export interface FlightData {
  name: string;
  count: number;
}

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
  dataInFlight: FlightData[] = [];

  constructor(private functions: FunctionsService) {}

  set newAuthUserData(user: User) {
    this.authUserData = user;
  }

  addUser() {
    this.addDataInFlight('user');
    this.functions.addUser(this.authUserData).then(() => {
      this._userData.next(this.authUserData);
      this.removeDataInFlight('user');
    });
  }

  getUser() {
    this.addDataInFlight('user');
    this.functions.getUser().then((user: any) => {
      this.removeDataInFlight('user');
      if (user.data === 'no data') {
        this.addUser();
      } else {
        this._userData.next(user.data);
      }
    });
  }

  saveUser(userData: User): void {
    this.addDataInFlight('user');
    this.functions.editUser(userData).then(() => this.removeDataInFlight('user'));
  }

  updateUser(userDetails: User) {
    this.addDataInFlight('user');
    this.functions.editUser(userDetails).then(() => {
      this._userData.next(userDetails);
      this.removeDataInFlight('user');
    });
  }

  resetUser() {
    this._userData.next(DataService.newUser);
  }

  updateLoadingStatus() {
    if (this.dataInFlight.length) {
      setTimeout(() => {
        this._isLoading.next(true);
      });
    } else {
      setTimeout(() => {
        this._isLoading.next(false);
      });
    }
  }

  getIndividualItems(filter: string | null = null): Promise<any> {
    this.addDataInFlight('item');
    return this.functions.getIndividualShoppingListItems(filter);
  }

  editIndividualShoppingListItem(data: any): Promise<HttpsCallableResult> {
    this.addDataInFlight('item');
    return this.functions.editIndividualShoppingListItem(data);
  }

  addIndividualShoppingListItem(data: any): Promise<HttpsCallableResult> {
    this.addDataInFlight('item');
    return this.functions.addIndividualShoppingListItem(data);
  }

  deleteIndividualShoppingListItems(
    ids: string[]
  ): Promise<HttpsCallableResult> {
    this.addDataInFlight('item');
    return this.functions.deleteIndividualShoppingListItems(ids);
  }

  getIndividualLists(
    filter: string | null = null
  ): Promise<HttpsCallableResult> {
    this.addDataInFlight('list');
    return this.functions.getIndividualLists(filter);
  }

  addIndividualList(list: List): Promise<HttpsCallableResult> {
    this.addDataInFlight('list');
    return this.functions.addIndividualList(list);
  }

  deleteIndividualList(id: string): Promise<HttpsCallableResult> {
    this.addDataInFlight('list');
    return this.functions.deleteIndividualList(id);
  }

  editIndividualList(list: List): Promise<HttpsCallableResult> {
    this.addDataInFlight('list');
    return this.functions.updateIndividualList(list);
  }

  getCategories(): Promise<HttpsCallableResult> {
    this.addDataInFlight('category');
    return this.functions.getCategories();
  }

  addCategories(categories: string[]): Promise<HttpsCallableResult> {
    this.addDataInFlight('category');
    return this.functions.addCategories(categories);
  }

  addDataInFlight(name: string): void {
    let found = false;
    for (let data of this.dataInFlight) {
      if (data.name === name) {
        data.count += 1;
        found = true;
        this.updateLoadingStatus();
        break;
      }
    }
    if (!found) {
      const options = ['item', 'list', 'category', 'user'];
      if (options.includes(name)) {
        let newData: FlightData = {
          name: name,
          count: 1,
        };
        this.dataInFlight.push(newData);
        this.updateLoadingStatus();
      } else {
        throw 'Invalid FlightData name.';
      }
    }
  }

  removeDataInFlight(name: string) {
    let found = false;
    for (let data of this.dataInFlight) {
      if (data.name === name && data.count > 1) {
        data.count -= 1;
        found = true;
        this.updateLoadingStatus();
        break;
      }
      if (data.name === name && data.count === 1) {
        this.dataInFlight = this.dataInFlight.filter(
          (data: FlightData) => data.name !== name
        );
        this.updateLoadingStatus();
        found = true;
        break;
      }
    }
    if (!found) {
      throw "Trying to remove FlightData that doesn't exist.";
    }
  }
}
