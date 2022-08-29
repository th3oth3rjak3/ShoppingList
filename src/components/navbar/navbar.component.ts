import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(public authService: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.data.userData.subscribe((user: User) => (this.userData = user));
    this.data.getUser();
  }

  ngAfterContentInit(): void {
    if (this.darkMode) {
      this.enableDarkMode();
    }

    this.appName = DataService.appName;
  }

  toggleTheme(): void {
    if (this.darkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode(): void {
    this.data.saveTheme('dark');
    document.body.classList.add('dark-theme');
  }

  disableDarkMode(): void {
    this.data.saveTheme('light');
    document.body.classList.remove('dark-theme');
  }

  get darkMode(): boolean {
    return window.localStorage.getItem('hathaway-home-theme') === 'dark';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
