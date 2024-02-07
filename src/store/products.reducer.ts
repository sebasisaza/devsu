import { Product } from '../models/product.model';
import { createReducer, on } from '@ngrx/store';
import * as productsActions from '../store/products.actions';

export interface ProductState {
  data: Product[];
  isLoading: boolean;
  error: string;
  search: string;
  showRecords: number;
}

export const initialState: ProductState = {
  data: [],
  isLoading: false,
  error: '',
  search: '',
  showRecords: 5,
};

export const productReducer = createReducer(
  initialState,
  on(productsActions.loadData, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(productsActions.loadDataSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    data,
  })),
  on(productsActions.updateSearch, (state, { search }) => ({
    ...state,
    search,
  }))
);
