import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  dateTime: Date | null = null;
  dateRange: Date[] = [];
  range: "range" | "single" | "multiple" | undefined = 'range';

  dateTimeOptions = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    time_24hr: true,
    defaultHour: 9,
    defaultMinute: 30,
    minDate: 'today',
    altInput: true,
    altFormat: 'd F Y H:i',
    allowInput: true,
    clickOpens: true,
  };

  dateRangeOptions = {
    mode: this.range,
    dateFormat: 'Y-m-d',
    altFormat: 'd F Y',
    minDate: 'today',
    altInput: true,
    clickOpens: true
  };
}
