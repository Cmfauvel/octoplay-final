import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImagesService } from 'src/app/services/images.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Image } from 'src/app/_models/img';
import { Item } from 'src/app/_models/item';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-panier-list',
  templateUrl: './panier-list.component.html',
  styleUrls: ['./panier-list.component.scss']
})
export class PanierListComponent implements OnInit {
  product = 0;
  price: number = 0;
  orderId: string;
  userId;
  currentOrder: Order;
  images: Image[];
  items: Item[];
  listProducts = [];
  map: Map<Object[], Object>;
  joinList = [];
  dataList;
  newItem;
  headImg;
  currentPictures = [];
  nbItems;
  totalPrice;

  constructor(private orderService: OrderService,
    private auth: AuthenticationService,
    private productService: ProductService,
    private imgService: ImagesService) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.orderService.currentOrderSubject.subscribe(
      (resp: Order) => {
        this.currentOrder = resp;
        this.totalPrice = this.currentOrder.price + this.currentOrder.price * 0.2 + 3.5;
        this.items = resp.items;
        this.nbItems = this.items.length;
        const tabQuery = [];
        for (let i = 0; i < this.items.length; i++) {
           this.nbItems += this.items[i].qty - 1;
                console.log(this.nbItems)
          console.log(this.items[i].qty)
          tabQuery.push(this.productService.getOneProduct(this.items[i].ProductId))
        }
        forkJoin(tabQuery).subscribe((resp) => {
          this.listProducts = resp;
          console.log('LISTE DE PRODUITS :', resp)
          for (let i = 0; i < this.listProducts.length; i++) {
            this.items.map(item => {
              if (item.ProductId == this.listProducts[i].id) {
                let count = (this.listProducts[i].images.length - 1);
                let nb = Math.floor(Math.random() * count);
                this.newItem = {
                  id: item.id,
                  qty: item.qty,
                  price: item.price,
                  name: this.listProducts[i].name,
                  path: this.listProducts[i].images[nb].path
                }
                this.joinList.push(this.newItem)
                this.dataList = [...new Set(this.joinList)];
              }
            })
            console.log(this.dataList)
          }
        })


      }),
      (err: any) => {

      }

    this.orderService.selectOrder(this.userId);
  }

  compare(tab) {
    tab.sort((a, b) => {
      if (a.ProductId > b.ProductId) {
        return -1;
      } else if (a.ProductId == b.ProductId) {
        return 0;
      }
      return 1;
    });
  }

  getListOrder() {
    for (let i; i < this.items.length; i++) {
      this.productService.getOneProduct(this.items[i].ProductId).subscribe((resp) => {
        this.listProducts.push(resp)
        console.log(this.listProducts)
      })
    }
  }



  updateOrder() {
  }

}

