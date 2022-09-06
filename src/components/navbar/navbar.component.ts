import {
  AfterContentInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/user/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit, AfterContentInit, OnDestroy {
  appName: string = '';
  userData: User = DataService.newUser;
  sub: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private data: DataService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.appName = DataService.appName;
    this.data.userData.subscribe((user: User) => {
      this.zone.run(() => (this.userData = user));
      this.setTheme();
    });
  }

  ngAfterContentInit(): void {}

  setTheme(): void {
    const userTheme = this.getUserTheme();
    if (userTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  saveUserTheme(theme: string) {
    this.userData.theme = theme;
    this.data.updateUser(this.userData);
  }

  toggleTheme(): void {
    if (this.darkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode(): void {
    this.saveTheme('dark');
    if (this.userData && this.userData.name && this.userData.theme !== 'dark') {
      this.saveUserTheme('dark');
    }
    document.body.classList.add('dark-theme');
  }

  disableDarkMode(): void {
    this.saveTheme('light');
    if (
      this.userData &&
      this.userData.name &&
      this.userData.theme !== 'light'
    ) {
      this.saveUserTheme('light');
    }
    document.body.classList.remove('dark-theme');
  }

  get darkMode(): boolean {
    return this.zone.run(() => {
      if (
        this.userData &&
        this.userData.name &&
        this.userData.theme === 'dark'
      ) {
        return true;
      }
      if (this.getTheme() === 'dark') {
        return true;
      }
      return false;
    });
  }

  saveTheme(theme: string): void {
    window.localStorage.setItem('hathaway-home-theme', theme);
  }

  getTheme(): string {
    let theme = window.localStorage.getItem('hathaway-home-theme');
    if (!theme) {
      theme = 'light';
    }
    return theme;
  }

  getUserTheme(): string {
    if (this.userData && this.userData.name) {
      return this.userData.theme;
    } else {
      return this.getTheme();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
