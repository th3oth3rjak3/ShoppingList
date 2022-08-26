import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private _appName: string = 'Shopping List';

  constructor() {}


  get appName(): string {
    return this._appName;
  }
}
