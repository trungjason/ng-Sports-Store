import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductRepository } from 'src/app/models/product.repository';

@Component({
  templateUrl: 'product-editor.component.html',
})
export class ProductEditorComponent {
  editing: boolean = false;
  product: Product = new Product();

  constructor(
    private productRepository: ProductRepository,
    private router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.editing = activatedRoute.snapshot.params['mode'] == 'edit';

    if (this.editing) {
      Object.assign(
        this.product,
        productRepository.getProduct(activatedRoute.snapshot.params['id'])
      );
    }
  }

  save() {
    this.productRepository.saveProduct(this.product);
    this.router.navigateByUrl('/admin/main/products');
  }
}
