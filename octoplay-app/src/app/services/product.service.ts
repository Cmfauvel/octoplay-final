import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUri = `${environment.apiUrl}/products`;
  currentProductsSubject: Subject<Product[]> = new Subject();

  constructor(private http: HttpClient) {
  }

  selectAll(): Subscription {
    return this.http.get<Array<Product>>(this.baseUri).subscribe((resp) => {
      this.currentProductsSubject.next(resp);
    })
  }

  update(id, newValues): Observable<any> {
    return this.http.put<Product>(this.baseUri + '/' + id, newValues);
  }

  delete(id): Observable<any> {
    return this.http.delete<Product>(this.baseUri + '/' + id);
  }

  create(product): Observable<any> {
    return this.http.post<any>(this.baseUri + '/insert', product);
  }

  getAllGames(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/v1/products/games`
    );
  }

  getOneProduct(id): Observable<any> {
    return this.http
      .get<Product>(`http://localhost:3000/api/v1/products/${id}`);
  }
}
