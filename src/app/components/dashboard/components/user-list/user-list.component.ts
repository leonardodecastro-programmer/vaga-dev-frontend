import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  pages = [1, 2, 3, 4, 5, 6];
  currentPage: number = 1;

  setCurrentPage(page: number) {
    this.currentPage = page;
  }
}
