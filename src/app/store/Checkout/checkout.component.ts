import { Component } from '@angular/core';
import { OrderRepository } from 'src/app/models/order.repository';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/models/order.model';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['checkout.component.scss'],
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(public repository: OrderRepository, public order: Order) {}

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.repository.saveOrder(this.order).subscribe((order: Order) => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }
}
