import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Item {
  id: number;
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://run.mocky.io/v3/1c7a0177-d67f-4a2a-8f03-abfd66b5209b";
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) { }

  getUsersData(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching user data:', error);
        return throwError(() => new Error('Error fetching user data'));
      })
    );
  }

  authenticate(email: string, password: string, users: Item[]): boolean {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('user', 'mock-token');
      return true;
    }
    return false;
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
