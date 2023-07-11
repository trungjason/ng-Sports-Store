import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { StoreComponent } from './store/store.component';
import { CartDetailComponent } from './store/CartDetail/cart-detail.component';
import { CheckoutComponent } from './store/Checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { StoreFirstGuard } from './guards/storeFirst.guard';

const route = [
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'cart',
    component: CartDetailComponent,
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [StoreFirstGuard],
  },
  { path: '**', redirectTo: '/store' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule, RouterModule.forRoot(route)],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
