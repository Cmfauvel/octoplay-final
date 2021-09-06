import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../_models/item';
import { Order } from '../_models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public currentOrderSubject: Subject<Order> = new Subject();
  public currentItemsSubject: Subject<Item[]> = new Subject();
  public allOrdersSubject: Subject<Order[]> = new Subject();
  baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }


  selectOrder(userId): Subscription {
    return this.http.get<Order>(this.baseUrl + '/user/' + userId + "/order").subscribe((resp) => {
      this.currentOrderSubject.next(resp);
    })
  }

  selectAll(): Subscription {
    return this.http.get<Order[]>(this.baseUrl + "/orders").subscribe((resp) => {
      this.allOrdersSubject.next(resp);
    })
  }

  selectAllItems(orderId): Subscription {
    return this.http.get<Item[]>(this.baseUrl + `/order/${orderId}/items`).subscribe((resp) => {
      this.currentItemsSubject.next(resp);
    })
  }

  deleteItem(id, userId): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/order/${id}`, userId);
  }

  createOrUpdateItems(orderId, item, userId): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/order/${orderId}/newItem`, item, userId);
  }

  updateItems(orderId, item, userId): Observable<any> {
    return this.http.put<any>(this.baseUrl + `/order/${orderId}/newItem`, item, userId);
  }

  updatePriceOrder(orderId, userId): void {
    this.http.put<any>(this.baseUrl + `/user/${userId}/order/total/${orderId}`, userId).subscribe((resp) => {
      this.selectOrder(userId);
    })
  }

  update(userId, id, address_id): Observable<any> {
    return this.http.put<any>(this.baseUrl + `/user/${userId}/order/${id}`, address_id);
  }
}
