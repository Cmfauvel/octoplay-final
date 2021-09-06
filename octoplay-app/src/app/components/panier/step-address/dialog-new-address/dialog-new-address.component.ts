import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { AddressService } from 'src/app/services/address.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Address } from 'src/app/_models/address';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-dialog-new-address',
  templateUrl: './dialog-new-address.component.html',
  styleUrls: ['./dialog-new-address.component.scss'],
})
export class DialogNewAddressComponent implements OnInit {
  newAddressForm: FormGroup;
  alertMessage = '';
  showMessage: boolean;
  currentUser: User;
  addresses: Address[];
  userId: string;
  constructor(
    public dialogRef: MatDialogRef<DialogNewAddressComponent>,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private AddressService: AddressService
  ) {
    this.auth.currentUserSubject.subscribe((response) => {
      this.currentUser = response;
    });
  }

  ngOnInit(): void {
    this.initAddressForm();
    this.userId = this.auth.getUserId();
  }

  initAddressForm(): void {
    this.newAddressForm = this.fb.group({
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
    this.AddressService.createAddress(this.newAddressForm.value, this.userId).subscribe(
      (resp) => {
        this.AddressService.selectAddresses(this.userId);
        this.alertMessage = resp.message;
        this.showMessage = !this.showMessage;
      });
  }
}
