import { of } from 'rxjs';

import { ProductService } from './products.service';

const dataMock = [
  {
    id: 1,
    name: 'name 1',
  },
  {
    id: 2,
    name: 'name 2',
  },
];

const provide = (mock: any): any => mock;

describe('Service: Lists', () => {
  let productService: ProductService;

  const http = { get: jest.fn(() => of(dataMock)) };
  beforeEach(() => {
    productService = new ProductService(provide(http));
  });

  it('should create service', (): void => {
    expect(productService).toBeTruthy();
  });

  it('Should call getProducts and return an array of Products', () => {
    productService.getProducts().subscribe((res) => {
      expect(res).toEqual(dataMock);
    });
  });
});
