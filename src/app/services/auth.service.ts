import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  User
} from 'firebase/auth';
import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  firebaseApp = initializeApp(environment.firebaseConfig);
  auth = getAuth(this.firebaseApp);

  constructor(public router: Router) {}

  StoreUser(auth: auth.UserCredential) {
    localStorage.setItem('user', JSON.stringify(auth.user));
  }

  GetUser(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = this.GetUser();
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    signInWithPopup(this.auth, provider)
      .then((result: auth.UserCredential | null) => {
        if (result) {
          this.StoreUser(result);
          this.router.navigate(['home']);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
