import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from 'src/components/products/products.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from 'src/store/products.effects';
import { HttpClientModule } from '@angular/common/http';
import { productReducer } from 'src/store/products.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from 'src/components/add-product/add-product.component';

@NgModule({
  declarations: [AppComponent, ProductsComponent, AddProductComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([ProductsEffects]),
    StoreModule.forRoot({ products: productReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
