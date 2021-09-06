import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { Item } from 'src/app/_models/item';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-dialog-edit-item',
  templateUrl: './dialog-edit-item.component.html',
  styleUrls: ['./dialog-edit-item.component.scss']
})
export class DialogEditItemComponent implements OnInit {
  editForm;
  item: Item;
  alertMessage: string;
  error: boolean = false;
  currentOrder : Order;
  userId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogEditItemComponent>,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.item = this.data;
    console.log(this.item)
    this.initEditForm();
    this.userId = this.auth.getUserId();
    this.orderService.currentOrderSubject.subscribe((resp) => {
      this.currentOrder = resp;
    })
    this.orderService.selectOrder(this.userId);
  }

  initEditForm(): void {
    this.editForm = this.formBuilder.group({
      qty: this.formBuilder.control('', [Validators.required])
    });
    this.editForm.setValue({
      qty: this.item.qty
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  update(): void {
    const body = {
      ProductId: this.item.ProductId,
      qty: this.editForm.value.qty
    }
    console.log(body)
    this.orderService.updateItems(this.currentOrder.id, body, this.userId).subscribe((resp) => {
      console.log(resp)
      this.orderService.selectOrder(this.userId);
      this.orderService.updatePriceOrder(this.currentOrder.id, this.userId);
      this.orderService.selectAllItems(this.currentOrder.id);
    })
    // this.orderService.update(this.order.user_id, this.order.id, this.editForm.value).subscribe((resp) => {
    //   this.alertMessage = resp.message;
    //   this.orderService.selectAll();
    //   if (this.alertMessage == "L'ajout à la base de données a échoué.")
    //     this.error = true;
    // });
  }
}