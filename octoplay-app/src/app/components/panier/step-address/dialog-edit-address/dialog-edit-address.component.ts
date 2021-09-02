import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/_models/user';
import { AddressService } from 'src/app/services/address.service';
import { Validators } from '@angular/forms';
import { Address } from 'src/app/_models/address';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  updateAddressForm: FormGroup;
  alertMessage: string = "";
  showMessage: boolean;
  currentUser: User;
  address: Address;
  userId;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private AddressService: AddressService
  ) {
  }

  ngOnInit(): void {
    this.address = this.data;
    this.userId = this.auth.getUserId();
    this.auth.currentUserSubject.subscribe((response) => {
      this.currentUser = response;
    })
    this.initAddressForm();
    this.updateAddressForm.setValue({
      lastName: this.address.lastName,
      firstName: this.address.firstName,
      society_name: this.address.society_name,
      num: this.address.num,
      telephone: this.address.tel,
      street: this.address.street,
      zip_code: this.address.zip_code,
      city: this.address.city,
      additionnal_information: this.address.additionnal_information,
      country: this.address.country
    });
  }

  initAddressForm(): void {
    this.updateAddressForm = this.fb.group({
      lastName: this.fb.control('', [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      society_name: this.fb.control(''),
      num: this.fb.control('', [Validators.required]),
      telephone: this.fb.control(''),
      street: this.fb.control('', [Validators.required]),
      zip_code: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      additionnal_information: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required])
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.AddressService.updateAddress(this.updateAddressForm.value, this.userId, this.address.id).subscribe(
      (data) => {
        this.auth.findUserById();
        this.AddressService.selectAddresses(this.userId);
        this.alertMessage = data.message;
        this.showMessage = !this.showMessage;
      }
    );
  }
}