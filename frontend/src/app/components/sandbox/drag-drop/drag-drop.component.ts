import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  standalone: false,
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css',
})
export class DragDropComponent {
  wasDropped = false;

  onDragStart(event: DragEvent): void {
  event.dataTransfer?.setData('text/plain', 'dragged-box');

  // Optional: Reset drop state if dragging from drop zone
  if (this.wasDropped) {
    this.wasDropped = false;
  }
}

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Required to allow drop
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data === 'dragged-box') {
      this.wasDropped = true;
    }
  }

  reset() {
    this.wasDropped = false;
  }
}
