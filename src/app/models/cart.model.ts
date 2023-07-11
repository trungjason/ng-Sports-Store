import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()
export class Cart {
  public cart: CartItem[] = [];
  public totalItem: number = 0;
  public totalPrice: number = 0;

  addCartItem(product: Product, quantity: number = 1) {
    const cartItem = this.cart.find(
      (cartItem) => cartItem.product.id === product.id
    );

    if (!cartItem) {
      this.cart.push(new CartItem(product, quantity));
    } else {
      cartItem.quantity += quantity;
    }

    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number = 1) {
    const cartItem = this.cart.find(
      (cartItem) => cartItem.product.id === product.id
    );

    if (cartItem) {
      cartItem.quantity += quantity;

      this.recalculate();
    }
  }

  removeItem(productId: number) {
    this.cart = this.cart.filter(
      (cartItem) => cartItem.product.id !== productId
    );

    this.recalculate();
  }

  clear() {
    this.cart = [];
    this.totalItem = 0;
    this.totalPrice = 0;
  }

  private recalculate() {
    this.totalItem = 0;
    this.totalPrice = 0;

    this.cart.forEach((cartItem) => {
      this.totalItem += cartItem.quantity;
      this.totalPrice += cartItem.totalPrice;
    });
  }
}

export class CartItem {
  constructor(public product: Product, public quantity: number) {}

  get totalPrice() {
    return this.quantity * (this.product.price ?? 0);
  }
}
