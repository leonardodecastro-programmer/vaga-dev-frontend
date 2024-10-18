import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  actives: boolean[] = [false, false];

  toggleActive(index: number) {
    this.actives[index] = !this.actives[index];
  }
}
