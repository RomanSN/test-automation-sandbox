import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  NgZone,
} from '@angular/core';
import { environment } from '../../../../environments/environment';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
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
  turnstileSiteKey = !environment.production
    ? '1x00000000000000000000AA'
    : '0x4AAAAAABdN0cfo7T0oJ4uD';
  token: string | null = null;

  private recaptchaWidgetId: any;

  constructor(private el: ElementRef, private zone: NgZone) {}

  ngAfterViewInit() {
    this.initTurnstile();

    // Setup callback for when reCAPTCHA script loads
    window.onRecaptchaLoad = () => {
      this.renderRecaptcha();
    };

    // If script already loaded before component mounts
    if (window.grecaptcha && window.grecaptcha.render) {
      this.renderRecaptcha();
    }
  }

  private renderRecaptcha() {
    const container = this.el.nativeElement.querySelector('#recaptcha-container');

    this.recaptchaWidgetId = window.grecaptcha.render(container, {
      sitekey: this.recaptchaSiteKey,
      callback: (token: string) => {
        this.zone.run(() => {
          this.token = token;
          this.tokenValidated.emit(token);
          console.log('reCAPTCHA token:', token);
        });
      },
    });
  }

  private initTurnstile() {
    const container = this.el.nativeElement.querySelector('.cf-turnstile');
    if (window.turnstile) {
      window.turnstile.render(container, {
        sitekey: this.turnstileSiteKey,
        callback: (token: string) => {
          this.zone.run(() => {
            this.tokenValidated.emit(token);
            console.log('Turnstile token:', token);
          });
        },
      });
    }
  }
}
