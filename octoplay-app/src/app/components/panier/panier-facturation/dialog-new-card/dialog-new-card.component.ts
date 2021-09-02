import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-new-card',
  templateUrl: './dialog-new-card.component.html',
  styleUrls: ['./dialog-new-card.component.scss']
})
export class DialogNewCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNewCardComponent>) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
