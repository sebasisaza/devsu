import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products.reducer';

export const productState = createFeatureSelector<ProductState>('products');

export const getIsLoading = createSelector(
  productState,
  (state: ProductState) => state.isLoading
);

export const getData = createSelector(productState, (state: ProductState) => {
  const search = state.search;

  if (search) {
    return state.data.filter((product) =>
      product.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return state.data;
});
