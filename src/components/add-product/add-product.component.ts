import * as productsSelectors from '../../store/products.selectors';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductState } from '../../store/products.reducer';
import * as productsActions from '../../store/products.actions';
import { Product } from 'src/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private store: Store<ProductState>,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public form = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', Validators.required),
    date_release: new FormControl('', [Validators.required]),
    date_revision: new FormControl('', [Validators.required]),
  });

  id: number = 0;

  ngOnInit(): void {
    this.form.controls.date_revision.disable();
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.form.controls.date_release.valueChanges.subscribe((date) => {
      let newDate = new Date(date ?? new Date());
      newDate.setFullYear(newDate.getFullYear() + 1);

      this.form.controls.date_revision.setValue(
        moment(newDate).format('d/MM/YYYY') ?? ''
      );
    });

    if (Number(this.id) > 0) {
      this.store.dispatch(productsActions.loadData());

      this.store.select(productsSelectors.getData).subscribe((products) => {
        const product = products.find(
          (product) => Number(product.id) === Number(this.id)
        );

        this.form.controls.id.setValue(product?.id.toString() ?? '');
        this.form.controls.id.disable();
        this.form.controls.name.setValue(product?.name ?? '');
        this.form.controls.description.setValue(product?.description ?? '');
        this.form.controls.logo.setValue(product?.logo ?? '');
        this.form.controls.date_release.setValue(
          moment(product?.date_release).format('d/MM/YYYY')
        );
        this.form.controls.date_revision.setValue(
          moment(product?.date_revision).format('d/MM/YYYY')
        );
      });
    }
  }

  onRestart(): void {
    this.form.reset();
  }

  onSend(): void {
    const product: Product = {
      id: Number(this.form.controls['id'].value) ?? 0,
      name: this.form.controls['name']?.value ?? '',
      description: this.form.controls['description']?.value ?? '',
      logo: this.form.controls['logo']?.value ?? '',
      date_release: new Date(this.form.controls['date_release']?.value ?? ''),
      date_revision: new Date(this.form.controls['date_revision']?.value ?? ''),
    };

    this.store.dispatch(productsActions.saveData({ product }));
  }

  onBack(): void {
    this.route.navigate(['/']);
  }

  onUpdate(): void {
    const product: Product = {
      id: Number(this.form.controls['id'].value) ?? 0,
      name: this.form.controls['name']?.value ?? '',
      description: this.form.controls['description']?.value ?? '',
      logo: this.form.controls['logo']?.value ?? '',
      date_release: new Date(this.form.controls['date_release']?.value ?? ''),
      date_revision: new Date(this.form.controls['date_revision']?.value ?? ''),
    };

    this.store.dispatch(productsActions.updateData({ product }));
  }
}
