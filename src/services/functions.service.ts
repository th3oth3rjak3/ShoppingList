import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  app = initializeApp(environment.firebaseConfig);
  functions = getFunctions(this.app);
  

  constructor() {}


  getIndividualShoppingListItems(filter: string | null = null) : Promise<HttpsCallableResult> {
    const getShoppingListItems = httpsCallable(this.functions, 'getIndividualShoppingListItems');
    return getShoppingListItems({filter: filter});
  }

  addIndividualShoppingListItem(data: any) : Promise<HttpsCallableResult> {
    const addIndividualShoppingListItem = httpsCallable(this.functions, 'addIndividualShoppingListItem');
    return addIndividualShoppingListItem(data);
  }

  deleteIndividualShoppingListItems(ids: string[]) : Promise<HttpsCallableResult> {
    const deleteIndividualShoppingListItems = httpsCallable(this.functions, 'deleteIndividualShoppingListItems');
    return deleteIndividualShoppingListItems(ids);
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

  addIndividualList(data: any) : Promise<HttpsCallableResult> {
    const addIndividualList = httpsCallable(this.functions, 'addIndividualList');
    return addIndividualList(data);
  }

  updateIndividualList(data: any) : Promise<HttpsCallableResult> {
    const updateIndividualList = httpsCallable(this.functions, 'updateIndividualList');
    return updateIndividualList(data);
  }

  getIndividualLists(filter: string | null = null) : Promise<HttpsCallableResult> {
    const getIndividualLists = httpsCallable(this.functions, 'getIndividualLists');
    return getIndividualLists({filter: filter});
  }

  deleteIndividualList(filter: string) : Promise<HttpsCallableResult> {
    const deleteIndividualList = httpsCallable(this.functions, 'deleteIndividualList');
    return deleteIndividualList({_id: filter});
  }

  getCategories(): Promise<HttpsCallableResult>{
    const getCategories = httpsCallable(this.functions, 'getCategories');
    return getCategories();
  }

  addCategories(categories: string[]): Promise<HttpsCallableResult>{
    const addCategories = httpsCallable(this.functions, 'addCategories');
    return addCategories({categories: categories});
  }

}
