import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable, HttpsCallableResult, connectFunctionsEmulator } from 'firebase/functions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  app = initializeApp(environment.firebaseConfig);
  functions = getFunctions(this.app);
  

  constructor() {
    connectFunctionsEmulator(this.functions, "localhost", 5001);
  }

  getHello(data: any) : Promise<HttpsCallableResult> {
    const helloWorld = httpsCallable(this.functions, 'helloWorld');
    return helloWorld(data);
  }

  getIndividualShoppingListItems() : Promise<HttpsCallableResult> {
    const getShoppingListItems = httpsCallable(this.functions, 'getIndividualShoppingListItems');
    return getShoppingListItems();
  }

  addIndividualShoppingListItem(data: any) : Promise<HttpsCallableResult> {
    const addIndividualShoppingListItem = httpsCallable(this.functions, 'addIndividualShoppingListItem');
    return addIndividualShoppingListItem(data);
  }

  deleteIndividualShoppingListItem(id: string) : Promise<HttpsCallableResult> {
    const deleteIndividualShoppingListItem = httpsCallable(this.functions, 'deleteIndividualShoppingListItem');
    return deleteIndividualShoppingListItem(id);
  }

  editIndividualShoppingListItem(data: any) : Promise<HttpsCallableResult> {
    const editIndividualShoppingListItem = httpsCallable(this.functions, 'editIndividualShoppingListItem');
    return editIndividualShoppingListItem(data);
  }

  getUser() : Promise<HttpsCallableResult> {
    const getUser = httpsCallable(this.functions, 'getUser');
    return getUser();
  }

  addUser(data: any) : Promise<HttpsCallableResult> {
    const addUser = httpsCallable(this.functions, 'addUser');
    return addUser(data);
  }

  editUser(data: any) : Promise<HttpsCallableResult> {
    const editUser = httpsCallable(this.functions, 'editUser');
    return editUser(data);
  }

}
