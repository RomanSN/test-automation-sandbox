import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';

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
  token: string | null = null;

  username = '';
  password = '';
  usernameTouched = false;
  passwordTouched = false;
  usernameError = false;
  passwordError = false;
  canSubmit = false;

  constructor(
    private el: ElementRef,
    private zone: NgZone,
    private router: Router
  ) {}

  ngAfterViewInit() {
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
    const container = this.el.nativeElement.querySelector(
      '#recaptcha-container'
    );

    window.grecaptcha.render(container, {
      sitekey: this.recaptchaSiteKey,
      callback: (token: string) => {
        this.zone.run(() => {
          this.token = token;
          this.tokenValidated.emit(token);
          this.validateFields();
        });
      },
    });
  }

  validateFields() {
    this.usernameTouched = true;
    this.passwordTouched = true;
    this.usernameError =
      !this.username || this.username.length < 5 || this.username.length > 10;
    this.passwordError =
      !this.password || this.password.length < 5 || this.password.length > 10;
    this.canSubmit = !this.usernameError && !this.passwordError && !!this.token;
  }

  onSubmit() {
    this.usernameTouched = true;
    this.passwordTouched = true;
    this.validateFields();
    if (this.canSubmit) {
      alert('Fake login successful!');
      // Reset form for demo
      this.username = '';
      this.password = '';
      this.token = null;
      this.canSubmit = false;
      this.reloadComponent();
    }
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
