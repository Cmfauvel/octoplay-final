import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-card',
  templateUrl: './dialog-edit-card.component.html',
  styleUrls: ['./dialog-edit-card.component.scss']
})
export class DialogEditCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditCardComponent>) { }
  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
