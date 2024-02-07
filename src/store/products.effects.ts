import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as productsActions from './products.actions';
import { ProductService } from './products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ProductsEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadData),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((data) => productsActions.loadDataSuccess({ data })),
          catchError((error) => of(productsActions.loadDataError({ error })))
        )
      )
    )
  );

  saveData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.saveData),
      switchMap((action) =>
        this.productService.saveProduct(action.product).pipe(
          mergeMap(() => [productsActions.saveDataSuccess()]),
          catchError((error) => of(productsActions.saveDataError({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.updateData),
      switchMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          mergeMap(() => [productsActions.updateDataSuccess()]),
          catchError((error) => of(productsActions.updateDataError({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.deleteData),
      mergeMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          mergeMap(() => [
            productsActions.deleteDataSuccess(),
            productsActions.loadData(),
          ]),
          catchError((error) => of(productsActions.deleteDataError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
