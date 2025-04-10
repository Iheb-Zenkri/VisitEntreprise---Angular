import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  iat: number;
  sub?: string;
}

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokenKey = 'auth_token';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      return true;
    }
  }
  
  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
