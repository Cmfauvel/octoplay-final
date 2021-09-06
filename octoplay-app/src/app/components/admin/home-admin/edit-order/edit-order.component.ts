import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  editForm;
  order: Order;
  alertMessage: string;
  error: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditOrderComponent>,
    private formBuilder: FormBuilder,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.order = this.data;
    console.log(this.order)
    this.initEditForm();
  }

  initEditForm(): void {
    this.editForm = this.formBuilder.group({
      state: this.formBuilder.control('', [Validators.required])
    });
    this.editForm.setValue({
      state: this.order.status
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.orderService.update(this.order.user_id, this.order.id, this.editForm.value).subscribe((resp) => {
      this.alertMessage = resp.message;
      this.orderService.selectAll();
      if (this.alertMessage == "L'ajout à la base de données a échoué.")
        this.error = true;
    });
  }
}
