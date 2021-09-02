import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { DialogEditCardComponent } from './dialog-edit-card/dialog-edit-card.component';
import { DialogNewCardComponent } from './dialog-new-card/dialog-new-card.component';


@Component({
  selector: 'app-panier-facturation',
  templateUrl: './panier-facturation.component.html',
  styleUrls: ['./panier-facturation.component.scss']
})
export class PanierFacturationComponent implements OnInit {
  userId;
  nbItems;
  currentOrder;
  totalPrice;
  constructor(private matDialog: MatDialog, 
    private orderService: OrderService,
    private auth: AuthenticationService) { }

  openDialogNewCard(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogNewCardComponent, {width:'100%', height: '70%', autoFocus: true});
  }
  openDialogEditCard(): void{
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogEditCardComponent, {width:'100%', height: '70%', autoFocus: true, });
  }
  ngOnInit(): void {

    this.orderService.currentOrderSubject.subscribe((resp) => {
      this.currentOrder = resp;
      this.totalPrice = this.currentOrder.price + this.currentOrder.price * 0.2 + 3.5;
    })
    this.userId = this.auth.getUserId();
    this.orderService.selectOrder(this.userId);
  }

  onSubmit(){
    console.log("payer")
  }

}
