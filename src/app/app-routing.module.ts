import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'src/components/products/products.component';
import { AddProductComponent } from 'src/components/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'add/:id', component: AddProductComponent },
];

@NgModule({
  declarations: [],
  imports: [[RouterModule.forRoot(routes)], CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
