import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../../services/books.service';
import { ReviewsService } from '../../services/reviews.service';
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.css',
})
export class BookInfoComponent {
  @Input() userBookData!: any;
  @Input() category!: any;
  @Input() bookId!: any;
  userId!: string;
  selectedOption!: string;
  selectedRating!: number;
  rates = [1, 2, 3, 4, 5];
  faStar = faStar;
  bookData!: any;
  

  constructor(
    private booksService: BooksService,
    private reviewService: ReviewsService,
  ) {}

  ngOnInit(){
    const userId = localStorage.getItem('userId')
    if (userId !== null) {
      this.userId = JSON.parse(userId);
  } else {
      console.log("id is not found.");
  }

  this.booksService.getBookById(this.bookId).subscribe({
    next: (res: any) => {
      this.bookData = res.data.book
    },
    error: (Error: any) => {
      console.error('Error adding the book:', Error);
    },
  });
  }

  ngOnChanges() {
    this.selectedOption = this.userBookData?.status || 'wish to read';
    this.selectedRating = this.userBookData?.rating|| 0;
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

  addtoUserBooks(){
    console.log(this.userId)
    console.log(this.bookId)
    this.booksService
        .addUserBook(this.userId, this.bookId)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.userBookData = res.data.addedUserBook
          },
          error: (addError: any) => {
            console.error('Error adding the book:', addError);
          },
        });
  }
}