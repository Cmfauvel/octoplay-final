import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmComponent } from 'src/app/_helpers/confirm/confirm.component';
import { Image } from 'src/app/_models/img';
import { Item } from 'src/app/_models/item';
import { Order } from 'src/app/_models/order';
import { DialogEditItemComponent } from './dialog-edit-item/dialog-edit-item.component';

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
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.orderService.currentOrderSubject.subscribe(
      (resp: Order) => {
        this.currentOrder = resp;
        this.totalPrice = this.currentOrder.price + this.currentOrder.price * 0.2 + 3.5;
        this.orderService.currentItemsSubject.subscribe((resp) => {
          this.items = resp;
        })
        this.orderService.selectAllItems(this.currentOrder.id);
       
      }),
      (err: any) => {
        console.log(err);
      };
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
        this.listProducts.push(resp);
      });
    };
  }

  openEditItem(item: Item): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogEditItemComponent, {
      width: '350px',
      autoFocus: true,
      data: item
    });
  }

  deleteItem(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: 'Voulez-vous supprimer ce produit ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteItem(id, this.userId).subscribe((resp) => {
          this.orderService.selectAllItems(this.currentOrder.id);
          this.orderService.selectOrder(this.userId);
          this.orderService.updatePriceOrder(this.currentOrder.id, this.userId);
        });
      };
    });
  }
}

