import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from '../guards/auth.guard';

let routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  declarations: [AdminComponent, AuthComponent],
  imports: [CommonModule, FormsModule, RouterModule, routing],
  providers: [AuthGuard],
})
export class AdminModule {}
