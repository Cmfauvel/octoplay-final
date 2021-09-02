import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUri = `${environment.apiUrl}/products`;

  currentProductsSubject : Subject<Product[]> = new Subject();
  
  constructor(private http: HttpClient) {
  }

  selectAll() {
    return this.http.get<Array<Product>>(this.baseUri).subscribe((resp) => {
      this.currentProductsSubject.next(resp);
    })
  }

  update(id, newValues) {
    return this.http.put<Product>(this.baseUri + '/' + id, newValues);
  }

  delete(id) {
    return this.http.delete<Product>(this.baseUri + '/' + id);
  }

  create(product) {
    return this.http.post<any>(this.baseUri + '/insert', product)
  }

  getAllGames() {
    console.log('game service called');
    return this.http.get<any>(
      `http://localhost:3000/api/v1/products/games`
    );
  }

  getOneProduct(id) {
    return this.http
      .get<Product>(`http://localhost:3000/api/v1/products/${id}`)

  }
}
