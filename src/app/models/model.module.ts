import { AuthService } from './../admin/auth/auth.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductRepository } from './product.repository';
import { DataSource } from './static.datasource';
import { Cart } from './cart.model';
import { OrderRepository } from './order.repository';
import { Order } from './order.model';
import { RestDataSource } from './rest.datasource';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ProductRepository,
    OrderRepository,
    DataSource,
    Cart,
    Order,
    {
      provide: DataSource,
      useClass: RestDataSource,
    },
    RestDataSource,
    AuthService
  ],
})
export class ModelModule {}
