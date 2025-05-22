import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-user-dialog',
  standalone: false,
  templateUrl: './confirm-delete-user-dialog.component.html',
  styleUrls: ['./confirm-delete-user-dialog.component.css']
})
export class ConfirmDeleteUserDialogComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();
}
