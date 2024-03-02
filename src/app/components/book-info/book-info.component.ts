import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../../services/books.service';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.css',
})
export class BookInfoComponent {
  @Input() userBookData!: any;
  userId!: string;
  selectedOption!: string;
  selectedRating!: number;
  rates = [1, 2, 3, 4, 5];
  faStar = faStar;

  constructor(
    private booksService: BooksService,
    private reviewService: ReviewsService
  ) {}

  ngOnChanges() {
    this.selectedOption = this.userBookData?.status || 'wish to read';
    this.selectedRating = this.userBookData?.rating|| 0;
    this.userId = window.localStorage.getItem('userId') || ''
  }

  rate(rating: number) {
    console.log('Rating:', rating);
    this.selectedRating = rating;
    this.reviewService
      .postOrEditRating(this.userBookData._id, rating)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (error: any) => {
          console.error('Error in the rating functionality:', error);
        },
      });
  }

  onSelectChange(event: any) {
    if (this.userBookData) {
      this.booksService.editUserBook(this.userBookData._id, event).subscribe({
        next: (editRes: any) => {
          console.log(editRes);
        },
        error: (editError: any) => {
          console.error('Error editing the book:', editError);
        },
      });
    } else {
      this.booksService
        .addUserBook(this.userId, this.userBookData._id, event)
        .subscribe({
          next: (addRes: any) => {
            console.log(addRes);
          },
          error: (addError: any) => {
            console.error('Error adding the book:', addError);
          },
        });
    }
  }
  removeUserBook() {
    console.log(this.userBookData._id);
    this.booksService.deleteUserBook(this.userBookData._id).subscribe({
      next: (res: any) => {
        this.userBookData = undefined;
      },
      error: (error: any) => {
        console.error('Error fetching the book:', error);
      },
    });
  }
}