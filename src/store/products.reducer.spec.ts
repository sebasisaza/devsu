import * as productsActions from './products.actions';
import { ProductState, productReducer } from './products.reducer';

export const productStateMock: ProductState = {
  data: [],
  isLoading: false,
  error: '',
  search: '',
  showRecords: 5,
};

describe('ProductsReducers', () => {
  let initialState: ProductState;

  beforeEach(() => {
    initialState = { ...initialState };
  });

  it('should change state when loadData', () => {
    const result = productReducer(initialState, productsActions.loadData());

    expect(result).toEqual({
      isLoading: true,
    });
  });

  it('should change state when loadDataSuccess', () => {
    const result = productReducer(
      initialState,
      productsActions.loadDataSuccess({
        data: [],
      })
    );
    expect(result).toEqual({
      isLoading: false,
      data: [],
    });
  });

  it('should change state when updateSearch', () => {
    const result = productReducer(
      initialState,
      productsActions.updateSearch({
        search: '',
      })
    );
    expect(result).toEqual({
      search: '',
    });
  });
});
