import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
editForm: FormGroup;
currentUser: User;
userId;
alertMessage: string;
error: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.initEditForm();
    try {
      this.userId = this.authService.getUserId();
      this.authService.findUserById();
      this.authService.currentUserSubject.subscribe((response) => {
        this.currentUser = response;
        this.editForm.setValue({
          lastName: this.currentUser.lastName,
          firstName: this.currentUser.firstName,
          mail: this.currentUser.mail
        })
      });
    } catch {
      console.log("__Error handled gracefully.")
    }
    
    
  }

  initEditForm(): void {
    this.editForm = this.fb.group({
      lastName: this.fb.control('', [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      mail: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    const newValues = {
      firstName: this.editForm.get('firstName').value,
      lastName: this.editForm.get('lastName').value,
      mail: this.editForm.get('mail').value
    };
    this.userService.update(this.userId, newValues).subscribe(
      (resp) => {
        this.authService.findUserById();
        this.alertMessage = resp.message;
        if(this.alertMessage == "La modification a échoué.") {
          this.error = true;
        } else {
          this.router.navigate(['/profil'])
        }
      }
    );
  }

}
