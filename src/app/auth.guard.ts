import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router, public data: DataService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.user;
    if (!user) {
      this.router.navigate(['sign-in'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
}
