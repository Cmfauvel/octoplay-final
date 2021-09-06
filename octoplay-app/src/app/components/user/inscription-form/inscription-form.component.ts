import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/_models/user';

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
    private router: Router
  ) { }

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
    const newUser: User = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      mail: this.registerForm.value.mail,
      password: this.registerForm.value.password
    };
    this.authService.register(newUser).subscribe(
      (data) => {
        if (data.error) {
          this.router.navigateByUrl('/inscription');
        } else {
          this.router.navigateByUrl('inscription/merci');
        };
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
