import { Product } from 'src/models/product.model';
import * as productsActions from './products.actions';

export const productsListMock: Product[] = [
  {
    id: 1,
    name: 'Credit Card 1',
    description: 'description',
    logo: 'logo',
    date_release: new Date('01/01/2020'),
    date_revision: new Date('01/01/2020'),
  },
  {
    id: 2,
    name: 'Credit Card 2',
    description: 'description',
    logo: 'logo',
    date_release: new Date('01/01/2020'),
    date_revision: new Date('01/01/2020'),
  },
];

describe('ProductsActions', () => {
  describe('LoadData', () => {
    it('should create an action to get products', () => {
      const expectedAction = {
        type: productsActions.loadData.type,
      };
      const action = productsActions.loadData();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('LoadDataSuccess', () => {
    it('should create an action to get products success', () => {
      const expectedAction = {
        type: productsActions.loadDataSuccess.type,
        data: productsListMock,
      };
      const action = productsActions.loadDataSuccess({
        data: productsListMock,
      });
      expect(action).toEqual(expectedAction);
    });
  });
});
