import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../_models/item';
import { Order } from '../_models/order';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
public currentOrderSubject: Subject<Order> = new Subject();
public currentItemsSubject : Subject<Item[]> = new Subject();
public allOrdersSubject: Subject<Order[]> = new Subject();
baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
   }

   
   selectOrder(userId){
    return this.http.get<Order>(this.baseUrl + '/user/' + userId + "/order").subscribe((resp) => {
      this.currentOrderSubject.next(resp);
    })
   }

   selectAll() {
     return this.http.get<Order[]>(this.baseUrl + "/orders").subscribe((resp) => {
      this.allOrdersSubject.next(resp);
     })
   }

   createOrderItems(orderId, productId, userId){
     return this.http.post<any>(this.baseUrl + `/order/${orderId}/newItem`, productId, userId)
   }

   updatePriceOrder(orderId, userId){
     console.log(userId)
    this.http.put<any>(this.baseUrl + `/user/${userId}/order/total/${orderId}`, userId).subscribe((resp) => {
      this.selectOrder(userId);
    })
   }

   update(userId, id, address_id){
    return this.http.put<any>(this.baseUrl + `/user/${userId}/order/${id}`, address_id);
   }
}
