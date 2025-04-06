import { EmailValidator } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(credentials: { email: string; password: string; expiresIn30Days:boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => this.tokenService.setToken(response.token))
    );
  }


  register(user: RegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  forgetPassword(email : String): Observable<any> {
    const body = {email}
    return this.http.post(`${this.apiUrl}/forgot-password`, body);
  }

  logout() {
    this.tokenService.clearToken();
  }

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER'
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}
