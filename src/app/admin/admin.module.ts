import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from '../guards/auth.guard';
import { MaterialsModule } from './materials.module';

import { ProductTableComponent } from './ProductTable/product-table.component';
import { ProductEditorComponent } from './ProductEditor/product-editor.component';
import { OrderTableComponent } from './OrderTable/order-table.component';

let routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  // { path: 'main', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'main',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'products/:mode/:id', component: ProductEditorComponent },
      { path: 'products/:mode', component: ProductEditorComponent },
      { path: 'products', component: ProductTableComponent },
      { path: 'orders', component: OrderTableComponent },
      { path: '**', redirectTo: 'products' },
    ],
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  declarations: [
    AuthComponent,
    AdminComponent,
    ProductTableComponent,
    ProductEditorComponent,
    OrderTableComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, routing, MaterialsModule],
  providers: [AuthGuard],
})
export class AdminModule {}
