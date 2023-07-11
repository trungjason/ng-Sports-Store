import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded: boolean = false;

  constructor(private dataSource: RestDataSource) {}

  private loadOrders() {
    this.dataSource.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }

    return this.orders;
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe((order) => {
      const orderIndex = this.orders.findIndex(
        (orderFind) => orderFind.id === order.id
      );

      if (!orderIndex || orderIndex < 0) return;

      this.orders.splice(orderIndex, 1, order);
    });
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe((order) => {
      const orderIndex = this.orders.findIndex(
        (orderFind) => orderFind.id === order.id
      );

      if (!orderIndex || orderIndex < 0) return;

      this.orders.splice(orderIndex, 1);
    });
  }

  saveOrder(order: Order): Observable<Order> {
    this.loaded = false;
    return this.dataSource.saveOrder(order);
  }
}
