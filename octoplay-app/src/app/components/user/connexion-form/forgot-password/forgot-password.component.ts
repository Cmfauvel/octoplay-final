import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  recupForm: FormGroup;
  user: User;
  newPasswordForm: FormGroup;
  code: any;
  isClicked = false;
  fieldTextType: boolean;
  userId: string;
  alertMessage = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.initRecupForm();
    this.initNewPasswordForm();
    try {
      this.userId = this.auth.getUserId();
    } catch (err) {
      console.log('__Error handled gracefully : ', err)
    }
  }

  initRecupForm(): void {
    this.recupForm = this.fb.group({
      mail: this.fb.control('', [Validators.required, Validators.email])
    });
  }

  initNewPasswordForm(): void {
    this.newPasswordForm = this.fb.group({
      code: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  sendMail(): void {
    this.isClicked = !this.isClicked;
    console.log(this.recupForm.value)
    this.userService.getNewPassword(this.recupForm.value.mail)
      .subscribe(
        (response) => {
          this.user = response.user;
          this.code = response.nb;
          return this.user + this.code;
        });
  }

  toggledEye(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  updatePassword(): void {
    if (this.newPasswordForm.value.code == this.code && this.newPasswordForm.value.password == this.newPasswordForm.value.repeatPassword) {
      this.userService.updatePassword(this.user.id, this.newPasswordForm.value).subscribe(
        (data) => {
          this.router.navigate(['/connexion'])
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("erreur");
      this.alertMessage = 'Le code ne correspond pas ou les mots de passe ne sont pas identiques.';
    };
  }
}