import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event
} from '@angular/router';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { User } from 'src/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy  {
  isLoading: boolean = true;
  userSub: Subscription = new Subscription();
  loadingSub: Subscription = new Subscription();
  routerSub: Subscription = new Subscription();
  userData: User = DataService.newUser;
  destroyed = new Subject<void>();
  showWelcome: boolean = true;
  showWelcomeMap = new Map([
    [Breakpoints.XSmall, false],
    [Breakpoints.Small, false],
    [Breakpoints.Medium, false],
    [Breakpoints.Large, true],
    [Breakpoints.XLarge, true],
  ]);

  constructor(
    public authService: AuthService,
    breakpointObserver: BreakpointObserver,
    public data: DataService,
    private router: Router
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.showWelcome = this.showWelcomeMap.get(query) ?? true;
          }
        }
      });
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
    .subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          setTimeout(() => {
            this.isLoading = true;
          });
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.isLoading = false;
          });
          break;
        }
        default: {
          break;
        }
      }
    });
    this.loadingSub = this.data.isLoading.subscribe((result: boolean) => {
      this.isLoading = result;
      //this.toggleLoading();
    });
    this.userSub = this.data.userData.subscribe((user: User) => {
      this.userData = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.loadingSub.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
    this.routerSub.unsubscribe();
  }
}
