import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { DataSource } from './static.datasource';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: DataSource) {
    console.log(dataSource);

    dataSource.product().subscribe((data: Product[]) => {
      this.products = data;
      this.categories = data
        .map((product) => {
          return product.category ?? 'None';
        })
        .filter((category, index, arr) => arr.indexOf(category) === index)
        .sort();
    });
  }

  getProducts(category?: string): Product[] {
    return this.products.filter(
      (p) => category == undefined || category == p.category
    );
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id == id);
  }

  getCategories(): string[] {
    return this.categories;
  }
}
