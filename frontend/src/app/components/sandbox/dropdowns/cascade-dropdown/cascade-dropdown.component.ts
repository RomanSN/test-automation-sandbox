import { Component } from '@angular/core';

@Component({
  selector: 'app-cascade-dropdown',
  standalone: false,
  templateUrl: './cascade-dropdown.component.html',
  styleUrl: './cascade-dropdown.component.css',
})
export class CascadeDropdownComponent {
  selectedCountry = '';
  selectedState = '';
  selectedCity = '';

  countries: Record<string, string[]> = {
    USA: ['California', 'Texas', 'New York', 'Florida', 'Nevada'],
    Germany: ['Bavaria', 'Hesse', 'Saxony', 'Berlin', 'Hamburg'],
    India: ['Delhi', 'Maharashtra', 'Karnataka', 'Punjab', 'Gujarat'],
  };

  cities: Record<string, string[]> = {
    // USA
    California: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'],
    Texas: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse'],
    Florida: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg'],
    Nevada: ['Las Vegas', 'Reno', 'Henderson', 'Sparks', 'Carson City'],
  
    // Germany
    Bavaria: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Würzburg'],
    Hesse: ['Frankfurt', 'Wiesbaden', 'Darmstadt', 'Kassel', 'Offenbach'],
    Saxony: ['Dresden', 'Leipzig', 'Chemnitz', 'Zwickau', 'Görlitz'],
    Berlin: ['Berlin'], // city-state
    Hamburg: ['Hamburg'], // city-state
  
    // India
    Delhi: ['New Delhi', 'Old Delhi', 'Dwarka', 'Rohini', 'Karol Bagh'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
    Punjab: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar']
  };

  clearSelection() {
    this.selectedCountry = '';
    this.selectedState = '';
    this.selectedCity = '';
  }

  stateMenus: Record<string, any> = {};
  cityMenus: Record<string, any> = {};

  setStateMenuRef(key: string, ref: any): boolean {
    this.stateMenus[key] = ref;
    return true;
  }

  setCityMenuRef(state: string, ref: any): boolean {
    this.cityMenus[state] = ref;
    return true;
  }

  allStates(): string[] {
    return Object.values(this.countries).flat();
  }

  selectCityForState(state: string, city: string): void {
    this.selectedState = state;
    this.selectedCity = city;

    // Also find the country
    this.selectedCountry =
      Object.keys(this.countries).find((country) =>
        this.countries[country].includes(state)
      ) || '';
  }
}
