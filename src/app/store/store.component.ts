import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductRepository } from '../models/product.repository';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
})
export class StoreComponent {
  selectedCategory: string | undefined;
  PAGE_SIZE = 4;
  currentPage = 1;

  constructor(
    private productRepository: ProductRepository,
    private cart: Cart,
    private router: Router
  ) {}

  get products(): Product[] {
    let pageSkip = (this.currentPage - 1) * this.PAGE_SIZE;

    return this.productRepository
      .getProducts(this.selectedCategory)
      .slice(pageSkip, pageSkip + this.PAGE_SIZE);
  }

  get categories(): string[] {
    return this.productRepository.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
  }

  changePageSize(newPageSize: number) {
    this.PAGE_SIZE = newPageSize;
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    // Create an empty array with size = Total Product length / page number
    // Then fill the empty array with zero values and + 1 to index to create a sequence array
    return Array(
      Math.ceil(
        this.productRepository.getProducts(this.selectedCategory).length /
          this.PAGE_SIZE
      )
    )
      .fill(0)
      .map((pageNumber, index) => index + 1);
  }

  get pageCount(): number {
    return Math.ceil(
      this.productRepository.getProducts(this.selectedCategory).length /
        this.PAGE_SIZE
    );
  }

  // Cart
  addProductToCart(product: Product) {
    this.cart.addCartItem(product);
    this.router.navigateByUrl('/cart');
  }
}
