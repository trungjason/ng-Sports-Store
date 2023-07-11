import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
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

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.dataSource
        .saveProduct(product)
        .subscribe((p) => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product).subscribe((p) => {
        this.products.splice(
          this.products.findIndex((p) => p.id == product.id),
          1,
          product
        );
      });
    }
  }
  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe((p) => {
      this.products.splice(
        this.products.findIndex((p) => p.id == id),
        1
      );
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
