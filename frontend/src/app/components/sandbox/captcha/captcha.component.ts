import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

declare global {
  interface Window {
    turnstile: any;
  }
}

@Component({
  selector: 'app-captcha',
  standalone: false,
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
})
export class CaptchaComponent implements AfterViewInit {
  @Output() tokenValidated = new EventEmitter<string>();

  recaptchaSiteKey = '6LcWbTorAAAAAJLxxUINO7ZI_zvCka3mb-Dcexr_';
  turnstileSiteKey = '0x4AAAAAABdN0cfo7T0oJ4uD';
  token: string | null = null;

  constructor(private el: ElementRef) {}

  onCaptchaResolved(token: string | null) {
    this.token = token!;
    console.log('Captcha resolved with token:', token);
  }

  onCaptchaToken(token: string | Event) {
    console.log('Received Turnstile token:', token);
    // Send this token to your backend for verification
  }

  ngAfterViewInit() {
    const container = this.el.nativeElement.querySelector('.cf-turnstile');
    window.turnstile.render(container, {
      sitekey: this.turnstileSiteKey,
      callback: (token: string) => {
        this.tokenValidated.emit(token);
      },
    });
  }
}
