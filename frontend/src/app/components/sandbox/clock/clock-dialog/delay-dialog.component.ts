import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delay-dialog',
  standalone: false,
  templateUrl: './delay-dialog.component.html',
  styleUrl: './delay-dialog.component.css'
})
export class DelayDialogComponent {
  constructor(public dialogRef: MatDialogRef<DelayDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
