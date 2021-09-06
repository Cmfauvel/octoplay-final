import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  currentUser: User;
  fieldTextType: boolean;
  alertMessage: string;
  errorMessage: string | null;
  userId: string;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private authService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initPassword();
    this.userId = this.authService.getUserId();
    this.authService.currentUserSubject.subscribe((response) => {
      this.currentUser = response;
    });
  }

  toggledEye(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  initPassword(): void {
    this.newPasswordForm = this.fb.group({
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: this.fb.control('', [Validators.required, Validators.minLength(8)])
    });
  }

  updateAndClose(): void {
    this.userService.updatePassword(this.userId, this.newPasswordForm.value).subscribe(
      (data) => {
        this.alertMessage = data.message;
        if (this.alertMessage === 'Votre mot de passe a été modifié.') {
          this.dialogRef.close();
        } else {
          this.errorMessage = this.alertMessage;
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
