import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  actives: boolean[] = [false, false];

  toggleActive(index: number) {
    this.actives[index] = !this.actives[index];
    console.log('toggleActive', this.actives);
  }
}
