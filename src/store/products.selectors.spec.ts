import { ProductState } from './products.reducer';
import * as productsSelectors from './products.selectors';

export const productStateMock: ProductState = {
  data: [],
  isLoading: false,
  error: '',
  search: '',
  showRecords: 5,
};

describe('Products Selectors', () => {
  it('should products isLoading state', () => {
    expect(productsSelectors.getIsLoading.projector(productStateMock)).toEqual(
      productStateMock.isLoading
    );
  });

  it('should products data state', () => {
    expect(productsSelectors.getData.projector(productStateMock)).toEqual(
      productStateMock.data
    );
  });
});
