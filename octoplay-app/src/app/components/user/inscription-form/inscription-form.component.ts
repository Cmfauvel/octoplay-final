import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/_models/user';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss'],
})
export class InscriptionFormComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  loading = false;
  submitted = false;
  fieldTextType: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.initRegisterForm();
  }

  toggledEye(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      lastName: this.fb.control('', [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      mail: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(): void {
    const firstName = this.registerForm.get('firstName').value;
    const lastName = this.registerForm.get('lastName').value;
    const mail = this.registerForm.get('mail').value;
    const password = this.registerForm.get('password').value;
    const newUser: User = {
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      password: password,
    }
    this.authService.register(newUser).subscribe(
      (data) => {
        if (data.error) {
          this.router.navigateByUrl('/inscription');
        } else {
          this.router.navigateByUrl('inscription/merci');
          console.log(data)
        }
      },
      (error) => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
