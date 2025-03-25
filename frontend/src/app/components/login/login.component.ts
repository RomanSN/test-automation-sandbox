import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../utils/error-handler.util';
import { ROUTES } from '../../data/urls/routes.enum';
import { minPasswordLength, minUsernameLength } from '../../data/auth.input.length';
import { AUTHORIZATION_FORM_LABELS } from '../../data/labels/auth-form-labels.enum';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  labels = AUTHORIZATION_FORM_LABELS;
  usernameRequiredMessage = 'Username is required';
  passwordRequiredMessage = 'Password is required';
  minUsernameLengthErrorMessage = `Username must be at least ${minUsernameLength} characters`;
  minPaswordLengthErrorMessage = `Password must be at least ${minPasswordLength} characters`;
  loginForm: FormGroup;
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isLoggedIn.subscribe(state => this.isLoggedIn = state);
    if(this.isLoggedIn) {
      this.router.navigate([ROUTES.home]);
    }
    this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(minUsernameLength)]],
        password: ['', [Validators.required, Validators.minLength(minPasswordLength)]],
    });
  }

  async login(): Promise<void> {
    const { username, password } = this.loginForm.value;
    try {
      await this.authService.login(username, password);
      this.isLoggedIn = true;
      this.router.navigate([ROUTES.articles]);
    } catch (error) {
      const message = getErrorMessage(error);
      alert(`Login failed with message: ${message}`);
    }
  }
}
