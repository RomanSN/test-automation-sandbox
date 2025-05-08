import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdowns',
  standalone: false,
  templateUrl: './dropdowns.component.html',
  styleUrl: './dropdowns.component.css'
})

export class DropdownsComponent {
  fruits = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango'];
  selectedFruit = '';
  isActionMenuOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleActionMenu() {
    this.isActionMenuOpen = !this.isActionMenuOpen;
  }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.isActionMenuOpen = false;
      }
    }
}
