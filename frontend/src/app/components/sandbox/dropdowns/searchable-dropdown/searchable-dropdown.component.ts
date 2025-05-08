import { Component } from '@angular/core';

@Component({
  selector: 'app-searchable-dropdown',
  standalone: false,
  templateUrl: './searchable-dropdown.component.html',
  styleUrl: './searchable-dropdown.component.css',
})
export class SearchableDropdownComponent {
  colors = ['Green', 'Red', 'Yellow', 'Brown', 'Purple', 'White', 'Blue'];
  selectedColor: string | null = null;
}
