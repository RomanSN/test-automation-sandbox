import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ROUTES } from './data/urls/routes.enum';
import { LOCAL_STORAGE_ITEMS } from './data/local-storage-items.enum';
import { APP_HEADER_LABELS } from './data/labels/app-header-labels.enum';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  labels = APP_HEADER_LABELS;
  homeButtonLabel = APP_HEADER_LABELS.homeButtonLabel;
  articlesButtonLabel = APP_HEADER_LABELS.articlesButtonLabel;
  logoutButtonLabel = APP_HEADER_LABELS.logoutButtonLabel;
  loginButtonLabel = APP_HEADER_LABELS.loginButtonLabel;
  signupinButtonLabel = APP_HEADER_LABELS.signupinButtonLabel;


  constructor(private authService: AuthService, private router: Router) {
    const token = localStorage.getItem(LOCAL_STORAGE_ITEMS.token);
    const isLoggedIn = !!token && token !== 'undefined';
    this.authService.setState(isLoggedIn);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(state => {
      this.isLoggedIn = state
      if (this.isLoggedIn) {
        this.username = localStorage.getItem(LOCAL_STORAGE_ITEMS.username);
      }
    });
    this.checkUserTokenExpiration();
    this.setTokenExpirationValidation();
  }

  checkUserTokenExpiration() {
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate([ROUTES.login]);
    }
  }

  setTokenExpirationValidation() {
    setInterval(() => {
      if (this.authService.isTokenExpired()) {
        this.authService.logout();
        this.router.navigate([ROUTES.login]);
      }
    }, 60000); // Check every minute
  }

  async logOut() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate([ROUTES.login]);
  }
}
