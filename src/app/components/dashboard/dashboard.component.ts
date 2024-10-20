import { Component } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavComponent, UserListComponent, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
