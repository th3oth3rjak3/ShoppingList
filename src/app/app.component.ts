import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { User } from 'src/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  userSub: Subscription = new Subscription();
  loadingSub: Subscription = new Subscription();
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
    private data: DataService,
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

  get displayName(): string {
    const name = this.userData?.name;
    return name ?? this.authService.user.displayName;
  }

  ngOnInit(): void {
    this.userSub = this.data.userData.subscribe((user: User) => {
      this.userData = user;
    });
    this.loadingSub = this.data.isLoading.subscribe(
      (result: boolean) => (this.isLoading = result)
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.loadingSub.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }
}
