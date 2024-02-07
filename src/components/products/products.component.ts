import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import * as productsActions from '../../store/products.actions';
import * as productsSelectors from '../../store/products.selectors';
import { Store } from '@ngrx/store';
import { ProductState } from 'src/store/products.reducer';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private store: Store<ProductState>,
    private route: Router,
    private renderer: Renderer2
  ) {}

  public products$: Observable<Product[]> = new Observable<Product[]>();
  public isLoading$: Observable<boolean> = new Observable<boolean>();

  public form = new FormGroup({
    search: new FormControl(''),
  });

  public productName = '';
  public productId = 0;

  @ViewChild('myModal') mymodal!: ElementRef;

  ngOnInit(): void {
    this.store.dispatch(productsActions.loadData());

    this.products$ = this.store.select(productsSelectors.getData);
    this.isLoading$ = this.store.select(productsSelectors.getIsLoading);

    this.form.controls['search'].valueChanges.subscribe((search) => {
      this.store.dispatch(
        productsActions.updateSearch({ search: search ?? '' })
      );
    });
  }

  onAdd(): void {
    this.route.navigate(['/add/0']);
  }

  onEdit(id: number): void {
    this.route.navigate([`/add/${id}`]);
  }

  onDelete(id: number, name: string): void {
    this.productName = name;
    this.productId = id;
    this.renderer.setStyle(this.mymodal.nativeElement, 'display', 'block');
  }

  onCancel(): void {
    this.renderer.setStyle(this.mymodal.nativeElement, 'display', 'none');
  }

  onConfirm(): void {
    this.store.dispatch(productsActions.deleteData({ id: this.productId }));
    this.renderer.setStyle(this.mymodal.nativeElement, 'display', 'none');
  }
}
