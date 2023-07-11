import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { Order } from './order.model';
import { Injectable } from '@angular/core';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  private baseUrl: string;
  auth_token?: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    console.log(this.baseUrl);
  }

  public product(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(this.baseUrl + 'login', { username, password })
      .pipe(
        map((response) => {
          const { success, token } = response;
          this.auth_token = success ? token : undefined;

          return success;
        })
      );
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.baseUrl + 'products',
      product,
      this.getOptions()
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}products/${product.id}`,
      product,
      this.getOptions()
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      `${this.baseUrl}products/${id}`,
      this.getOptions()
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'orders', this.getOptions());
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(
      `${this.baseUrl}orders/${id}`,
      this.getOptions()
    );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${this.baseUrl}orders/${order.id}`,
      order,
      this.getOptions()
    );
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer<${this.auth_token}>`,
      }),
    };
  }
}

type LoginResponse = {
  success: boolean;
  token?: string;
};
