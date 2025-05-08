import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  standalone: false,
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']  // ✅ FIXED
})
export class CustomDropdownComponent {
  cars = ['Ford', 'KIA', 'Tesla', 'Mercedes', 'Polonez'];
  selectedCar = '';
  isOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectCar(car: string, event: Event) {
    event.stopPropagation();  // Prevent dropdown from closing before selection
    this.selectedCar = car;
    this.isOpen = false;
  }

  clearSelection(event: Event) {
    event.stopPropagation();  // Prevent dropdown from closing before selection
    this.selectedCar = '';
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
