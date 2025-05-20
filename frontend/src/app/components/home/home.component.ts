import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  isVisible = false;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
}
