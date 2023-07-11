import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../admin/auth/auth.service';

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.authenticated) {
      return true;
    }

    this.router.navigateByUrl('/admin/auth');
    return false;
  }
}
