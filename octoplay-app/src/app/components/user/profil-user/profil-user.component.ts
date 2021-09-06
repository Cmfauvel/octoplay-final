import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../_models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmComponent } from 'src/app/_helpers/confirm/confirm.component';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss'],
})
export class ProfilUserComponent implements OnInit {
  currentUser: User;
  userId;

  constructor(private matDialog: MatDialog,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((response) => {
      this.currentUser = response;
    });
    this.userId = this.authService.getUserId();
    this.authService.findUserById();
  }

  openDialogEdit(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ChangePasswordComponent, {
      width: '100%',
      height: '80%',
      autoFocus: true,
    });
  }

  delete(): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: 'Voulez-vous supprimer votre compte ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Update status 'active' --> 'inactive' : ", result);
      };
    });
  }
}

