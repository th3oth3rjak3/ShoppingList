import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { User } from 'src/user/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit, AfterContentChecked, OnDestroy {
  appName: string = DataService.appName;
  returnUrl: string = 'home';
  sub: Subscription = new Subscription();
  userData: User = DataService.newUser;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.updateLoadingStatus(true);
    const url = this.route.snapshot.queryParams['returnUrl'];
    if (url?.length) {
      this.returnUrl = url;
    }

    this.sub = this.data.userData.subscribe(
      (user: User) => (this.userData = user)
    );
  }

  ngAfterContentChecked(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  googleAuth() {
    this.authService.GoogleAuth(this.returnUrl).then(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
