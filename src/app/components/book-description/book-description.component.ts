import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-description',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './book-description.component.html',
  styleUrl: './book-description.component.css',
})
export class BookDescriptionComponent {
  @Input() bookData: any;
  faStar = faStar;

  constructor() {}

  getStars(avgRating: number): number[] {
    const roundedRating = Math.round(avgRating);
    return Array.from({ length: roundedRating }, () => 1);
  }
}
