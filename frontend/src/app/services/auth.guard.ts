import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LOCAL_STORAGE_ITEMS } from '../data/local-storage-items.enum';
import { ROUTES } from '../data/urls/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem(LOCAL_STORAGE_ITEMS.token)) {
      return true;
    } else {
      this.router.navigate([ROUTES.login]);
      return false;
    }
  }
}
