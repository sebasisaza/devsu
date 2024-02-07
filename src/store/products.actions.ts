import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

const prefix = '[Product]';

export const loadData = createAction(`${prefix} Load Data`);

export const loadDataSuccess = createAction(
  `${prefix} Load Data Success`,
  props<{ data: Product[] }>()
);

export const loadDataError = createAction(
  `${prefix} Load Data Error`,
  props<{ error: string }>()
);

export const saveData = createAction(
  `${prefix} Save Data`,
  props<{ product: Product }>()
);

export const saveDataSuccess = createAction(`${prefix} Save Data Success`);

export const saveDataError = createAction(
  `${prefix} Save Data Error`,
  props<{ error: string }>()
);

export const updateData = createAction(
  `${prefix} Update Data`,
  props<{ product: Product }>()
);

export const updateDataSuccess = createAction(`${prefix} Update Data Success`);

export const updateDataError = createAction(
  `${prefix} Update Data Error`,
  props<{ error: string }>()
);

export const deleteData = createAction(
  `${prefix} Delete Data`,
  props<{ id: number }>()
);

export const deleteDataSuccess = createAction(`${prefix} Delete Data Success`);

export const deleteDataError = createAction(
  `${prefix} Delete Data Error`,
  props<{ error: string }>()
);

export const updateSearch = createAction(
  `${prefix} Update Search`,
  props<{ search: string }>()
);
