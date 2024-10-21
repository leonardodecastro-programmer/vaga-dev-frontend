import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Item {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  age: number;
  city: string;
  inicialData: string;
  salary: number;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://run.mocky.io/v3/f3a7f246-551f-4188-a1d8-8999f1931ab4";

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
      localStorage.setItem('userName', user.name);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getAuthenticatedUserName(): string | null {
    return localStorage.getItem('userName');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
  }
}
