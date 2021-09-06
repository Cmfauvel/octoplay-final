import { Component, Inject, OnInit } from '@angular/core';
import { Address } from 'src/app/_models/address';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/_models/user';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogNewAddressComponent } from './dialog-new-address/dialog-new-address.component';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { AddressService } from 'src/app/services/address.service';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmComponent } from 'src/app/_helpers/confirm/confirm.component';

@Component({
  selector: 'app-step-address',
  templateUrl: './step-address.component.html',
  styleUrls: ['./step-address.component.scss']
})
export class StepAddressComponent implements OnInit {
  addresses: Address[];
  selectForm: FormGroup;
  currentUser: User;
  mail;
  userId;
  nbItems;
  currentOrder;
  totalPrice;
  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(
    private auth: AuthenticationService,
    private matDialog: MatDialog,
    private addressService: AddressService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.orderService.currentOrderSubject.subscribe((resp) => {
      this.currentOrder = resp;
      this.totalPrice = this.currentOrder.price + this.currentOrder.price * 0.2 + 3.5;
    });
    this.auth.currentUserSubject.subscribe((resp) => {
      this.currentUser = resp;
      this.addresses = resp.addresses;
    });
    this.auth.findUserById();
    this.addressService.currentAddressesSubject.subscribe((resp) => {
      this.addresses = resp;
    });
    this.userId = this.auth.getUserId();
    this.addressService.selectAddresses(this.userId);
    this.orderService.selectOrder(this.userId);
  }

  initForm(): void {
    this.selectForm = this.formBuilder.group({
      addressId: this.formBuilder.control('')
    });
  }

  openDialogNewAddress(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogNewAddressComponent, {
      width: '100%',
      height: '80%',
      autoFocus: true
    });
  }

  openDialogEditAddress(address: Address): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogEditAddressComponent, {
      width: '100%',
      height: '80%',
      autoFocus: true,
      data: address
    });
  }

  onSubmit(): void {
    this.orderService.update(this.userId, this.currentOrder.id, this.selectForm.value).subscribe((resp) => {
      console.log(resp);
    })
  }

  delete(id) {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: "Voulez-vous supprimer cette adresse ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.delete(this.currentUser.id, id).subscribe(() => {
          this.addressService.selectAddresses(this.userId);
        });
      };
    });
  }
}
