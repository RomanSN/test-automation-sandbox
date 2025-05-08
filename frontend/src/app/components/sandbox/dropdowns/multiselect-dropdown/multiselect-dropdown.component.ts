import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-multiselect-dropdown',
  standalone: false,
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.css'
})
export class MultiselectDropdownComponent {
  skills = ['Angular', 'React', 'Vue', 'Svelte', 'Next.js'];
  selectedSkills: string[] = [];
  dropdownOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleSkill(skill: string) {
    const index = this.selectedSkills.indexOf(skill);
    if (index === -1) {
      this.selectedSkills.push(skill);
    } else {
      this.selectedSkills.splice(index, 1);
    }
  }

  isSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  clearSelection() {
    this.selectedSkills = [];
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
