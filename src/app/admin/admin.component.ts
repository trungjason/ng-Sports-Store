import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  templateUrl: 'admin.component.html',
})
export class AdminComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
