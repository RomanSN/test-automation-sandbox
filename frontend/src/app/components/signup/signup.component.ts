import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../utils/error-handler.util';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { ROUTES } from '../../data/urls/routes.enum';
import { maxPasswordLength, maxUsernameLength, minPasswordLength, minUsernameLength } from '../../data/auth.input.length';
import { AUTHORIZATION_FORM_LABELS } from '../../data/labels/auth-form-labels.enum';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  labels = AUTHORIZATION_FORM_LABELS;
  usernameRequiredMessage = 'Username is required';
  passwordRequiredMessage = 'Password is required';
  usernameLengthErrorMessage = `Username must be between ${minUsernameLength} - ${maxUsernameLength} characters`;
  passwordLengthErrorMessage = `Password must be between ${minPasswordLength} - ${maxPasswordLength} characters`;
  passwordsMismatchErrorMessage = 'Passwords do not match. Please try again.'
  deviceFingerprint = '';
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(minUsernameLength), Validators.maxLength(maxUsernameLength)]],
        password: ['', [Validators.required, Validators.minLength(minPasswordLength), Validators.maxLength(maxPasswordLength)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
    this.generateFingerprint();
  }

  async signUp(): Promise<void> {
    if (this.signUpForm.valid) {
      const { username, password } = this.signUpForm.value;
      try {
        const response = await this.authService.signUp(username, password, this.deviceFingerprint);
        alert(response.data.message);
        this.router.navigate([ROUTES.login]);
      } catch (error) {
        const message = getErrorMessage(error);
        alert(`Sign up failed with message: ${message}`);
      }
    }
  }

  private passwordsMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  private async generateFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    this.deviceFingerprint = result.visitorId;
  }
}
