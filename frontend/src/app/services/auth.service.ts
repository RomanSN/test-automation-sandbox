import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { BehaviorSubject } from 'rxjs';
import { USER_API_URL } from '../data/urls/user-api-urls.enum';
import { LOCAL_STORAGE_ITEMS } from '../data/local-storage-items.enum';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private stateSource = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.stateSource.asObservable();

  async login(username: string, password: string) {
    const response = await axios.post(USER_API_URL.login, { username, password });
    localStorage.setItem(LOCAL_STORAGE_ITEMS.token, response.data.token);
    localStorage.setItem(LOCAL_STORAGE_ITEMS.username, response.data.username);
    this.setState(true);
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.token);
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.username);
    this.setState(false);
  }

  async signUp(username: string, password: string, fingerprint: string): Promise<AxiosResponse<any, any>> {
    const response = await axios.post(USER_API_URL.signUp, { username, password, fingerprint });

    return response;
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_ITEMS.username);
  }

  setState(isLoggedIn: boolean): void {
    this.stateSource.next(isLoggedIn);
  }

  getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_ITEMS.token);
  }


  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return decodedToken.exp ? decodedToken.exp * 1000 : null; // Convert to milliseconds
    } catch (err) {
      console.log(`Token expired error: ${err}`);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    return expiration ? Date.now() > expiration : true;
  }

  async deleteUserAndArticles(): Promise<AxiosResponse<any, any>> {
    const token = this.getToken();
    const response = await axios.delete(USER_API_URL.delete, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  }
}
