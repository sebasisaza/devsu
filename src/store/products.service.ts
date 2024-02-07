import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _host =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    let headers = new HttpHeaders();
    headers = headers.append('authorId', '17');

    return this.http.get<Product[]>(`${this._host}bp/products`, { headers });
  }

  saveProduct(product: Product): Observable<Product> {
    let headers = new HttpHeaders();
    headers = headers.append('authorId', '17');

    return this.http.post<Product>(`${this._host}bp/products`, product, {
      headers,
    });
  }

  updateProduct(product: Product): Observable<string> {
    let headers = new HttpHeaders();
    headers = headers.append('authorId', '17');
    return this.http.put<string>(`${this._host}bp/products`, product, {
      headers,
    });
  }

  deleteProduct(id: number): Observable<string> {
    let headers = new HttpHeaders();
    headers = headers.append('authorId', '17');
    return this.http.delete<string>(`${this._host}bp/products?id=${id}`, {
      headers,
    });
  }
}
