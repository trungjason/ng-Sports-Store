import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { ModelModule } from '../models/model.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CounterDirective } from './counter.directive';
import { CartSummaryComponent } from './cart-summary.component';
import { CartDetailComponent } from './CartDetail/cart-detail.component';
import { CheckoutComponent } from './Checkout/checkout.component';

@NgModule({
  declarations: [
    StoreComponent,
    CounterDirective,
    CartSummaryComponent,
    CartDetailComponent,
    CheckoutComponent,
  ],
  exports: [StoreComponent, CartDetailComponent, CheckoutComponent],
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
})
export class StoreModule {}
