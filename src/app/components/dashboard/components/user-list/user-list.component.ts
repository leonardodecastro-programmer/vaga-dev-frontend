import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface User {
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

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usersPerPage = 10;
  currentPage: number = 1;
  data: User[] = [];
  paginatedData: User[] = [];
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const apiUrl = 'https://run.mocky.io/v3/f3a7f246-551f-4188-a1d8-8999f1931ab4';
    
    this.http.get<User[]>(apiUrl).subscribe({
      next: (response) => {
        this.data = response;
        this.totalPages = Math.ceil(this.data.length / this.usersPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePaginatedData();
      },
      error: (error) => {
        console.error('Erro ao buscar os dados:', error);
      }
    });
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.usersPerPage + 1;
  }
  
  get endIndex(): number {
    const potentialEndIndex = this.currentPage * this.usersPerPage;
    return potentialEndIndex > this.data.length ? this.data.length : potentialEndIndex;
  }
  
  get totalEntries(): number {
    return this.data.length;
  }
}
