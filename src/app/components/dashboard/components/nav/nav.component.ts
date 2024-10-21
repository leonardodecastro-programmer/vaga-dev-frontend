import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getAuthenticatedUserName();
  }
}
