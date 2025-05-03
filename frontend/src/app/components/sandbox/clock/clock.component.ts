import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DelayDialogComponent } from './clock-dialog/delay-dialog.component';

@Component({
  selector: 'app-clock',
  standalone: false,
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  buttonDisabled = false;
  currentTime = '';
  private intervalId: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateTime(): void {
    const now = new Date();

    const day = this.pad(now.getDate());
    const month = this.pad(now.getMonth() + 1);
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = this.pad(now.getMinutes());
    const seconds = this.pad(now.getSeconds());

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const formattedTime = `${day}.${month}.${year} ${this.pad(hours)}.${minutes}.${seconds} ${ampm}`;
    this.currentTime = formattedTime;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  openDialogWithDelay(): void {
    this.buttonDisabled = true;
    setTimeout(() => {
      const dialogRef = this.dialog.open(DelayDialogComponent, {
        width: '600px',
        panelClass: 'delayed-dialog-container'
      });

      dialogRef.afterClosed().subscribe(() => {
        this.buttonDisabled = false;
      });
    }, 10000);
  }
}
