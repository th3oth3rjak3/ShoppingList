import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  Auth
} from 'firebase/auth';
import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})
export class AuthService{
  userData: any = null; // Save logged in user data
  firebaseApp = initializeApp(environment.firebaseConfig);
  myAuth: Auth;

  constructor(public router: Router) {

    this.myAuth = getAuth(this.firebaseApp);
    onAuthStateChanged(this.myAuth, (user) => {
      if (user) {
        this.userData = user;
      } else {
        this.userData = null;
      }
    });
    setPersistence(this.myAuth, browserSessionPersistence);
  }

  // Returns true when user is logged in
  get isLoggedIn(): boolean {
    return (this.userData ? true : false);
  }
  // Sign in with Google
  async GoogleAuth(returnUrl: string) {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    })
    await this.AuthLogin(provider, returnUrl);
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: any, returnUrl: string) {
      signInWithPopup(this.myAuth, provider)
        .then((result: auth.UserCredential | null) => {
          if (result) {
            // TODO: Check if user is in user database collection
            // TODO: If so, navigate home, else go to user settings page
            this.router.navigate([returnUrl]);
          }
        })
        .catch((error) => {
          window.alert(error);
        });
  }

  get user() {
    return this.userData;
  }

  // Sign out
  SignOut() {
    signOut(this.myAuth).then(() => {
      this.userData = null;
      this.router.navigate(['sign-in']);
    });
  }
}
