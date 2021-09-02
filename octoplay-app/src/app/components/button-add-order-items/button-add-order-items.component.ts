import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { Item } from 'src/app/_models/item';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-button-add-order-items',
  templateUrl: './button-add-order-items.component.html',
  styleUrls: ['./button-add-order-items.component.scss']
})
export class ButtonAddOrderItemsComponent implements OnInit {
  currentOrder: Order;
  cart: Item;
  @Input() orderItemId;
  btnText: string = "ajouter";
  qty: number;
  userId;
  constructor(private orderService: OrderService,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    try {
      this.qty = 0;
      this.userId = this.auth.getUserId();
      console.log(this.userId);
      console.log(localStorage.getItem('token'))
    } catch(error) {
      console.log("__Error handled gracefully : ", error.name)
    }

  }

  addOrUpdateCart(): void {
    console.log("id product ajouté : ", this.orderItemId)
    this.qty = this.qty + 1;
    this.cart = {
      ProductId: this.orderItemId,
      qty: this.qty
    };
    const token = this.auth.getToken();
    if(!token) {
      console.log("Pas d'utilisateur connecté")
      this.btnText = `Ajouté(${this.qty})`;
      const currentCart = JSON.parse(sessionStorage.getItem(`${this.orderItemId}`));
        sessionStorage.setItem(`${this.orderItemId}`, JSON.stringify(this.cart));
    }
    if (token) {
      
      this.orderService.selectOrder(this.userId);
      this.orderService.currentOrderSubject.subscribe((resp) => {
        this.currentOrder = resp;
      })
      setTimeout(() => {
        this.orderService.createOrderItems(this.currentOrder.id, this.cart, this.userId).subscribe((resp) => {
          this.btnText = `Ajouté`;
          this.orderService.updatePriceOrder(this.currentOrder.id, this.userId)
        })
      }, 1000)
     
    } 
  }

}
