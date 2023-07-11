import { ProductRepository } from './../../models/product.repository';
import {
  Component,
  IterableDiffer,
  IterableDiffers,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  templateUrl: 'product-table.component.html',
})
export class ProductTableComponent {
  colsAndRows: string[] = ['id', 'name', 'category', 'price', 'buttons'];
  dataSource = new MatTableDataSource<Product>(
    this.productRepository.getProducts()
  );
  differ: IterableDiffer<Product>;

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  constructor(
    private productRepository: ProductRepository,
    differs: IterableDiffers
  ) {
    this.differ = differs.find(this.productRepository.getProducts()).create();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngDoCheck() {
    let changes = this.differ?.diff(this.productRepository.getProducts());
    if (changes != null) {
      this.dataSource.data = this.productRepository.getProducts();
    }
  }

  deleteProduct(id: number) {
    this.productRepository.deleteProduct(id);
  }
}
