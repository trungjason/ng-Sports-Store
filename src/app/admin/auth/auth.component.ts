import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'auth.component.html',
})
export class AuthComponent {
  username?: string;
  password?: string;
  errorMessage?: string;

  constructor(private router: Router, private authService: AuthService) {}

  authenticate(form: NgForm) {
    console.log(this.username, this.password);

    if (form.valid) {
      this.authService
        .authenticate(this.username ?? '', this.password ?? '')
        .subscribe((result) => {
          console.log('Authent result: ', result);
          if (result) {
            this.router.navigateByUrl('/admin/main');
          } else {
            this.errorMessage = 'Wrong username or password';
          }
        });
    } else {
      this.errorMessage = 'Error';
    }
  }
}
