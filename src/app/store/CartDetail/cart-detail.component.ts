import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';

@Component({
  templateUrl: './cart-detail.component.html',
})
export class CartDetailComponent {
  constructor(public cart: Cart) {}
}
