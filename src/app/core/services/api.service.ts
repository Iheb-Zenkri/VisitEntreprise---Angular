import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }
  
  getBlob(endpoint: string): Observable<Blob> {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.baseUrl}/${endpoint}`, {
      headers,
      responseType: 'blob'
    });
  }
  post<T>(endpoint: string, payload: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, payload);
  }

  put<T>(endpoint: string, payload: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, payload);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
