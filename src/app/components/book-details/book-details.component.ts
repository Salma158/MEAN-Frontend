import { Component, Input } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ReviewsService } from '../../services/reviews.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [FormsModule, RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  faStar = faStar;

  @Input() id!: string;

  bookData: any;
  userBookData!: any;
  selectedOption!: string;
  avgRating!: number;
  rates = [1, 2, 3, 4, 5];
  bookReviews! : any;
  selectedRating: number = 0;
  

  constructor(private BooksService: BooksService, private ReviewsService : ReviewsService) {}

  ngOnInit() {
    this.BooksService.getUserBookById(
      '65d9abb351fcf55837d66df8',
      this.id
    ).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.userBookData = res.data.userBook;
          this.selectedOption = this.userBookData.status || 'wish to read';
          this.selectedRating = this.userBookData.rating;
          console.log(this.selectedRating)
        } else {
          this.selectedOption = 'wish to read';
        }
      },
      error: () => {
        this.selectedOption = 'wish to read';
      },
    });

    this.BooksService.getBookById(this.id).subscribe({
      next: (res: any) => {
        this.bookData = res.data.book;
      },
      error: (error: any) => {
        console.error('Error fetching the book:', error);
      },
    });

    this.ReviewsService.getAvgRating(this.id).subscribe({
      next: (res: any) => {
        this.avgRating = res.data.avgRating
      },
      error: (error: any) => {
        console.error('Error in getting average rating functionality:', error);
      },
    })
    this.ReviewsService.getReviews(this.id).subscribe(
      {
        next: (res: any) => { 
          this.bookReviews = res.data.bookReviews
        },
        error: (error: any) => {
          console.error('Error fetching the reviews:', error);
        },
      }
      
    )

  }

  onSelectChange(event: any) {
    if (this.userBookData) {
      this.BooksService.editUserBook(this.userBookData._id, event).subscribe({
        next: (editRes: any) => {
          console.log(editRes);
        },
        error: (editError: any) => {
          console.error('Error editing the book:', editError);
        },
      });
    } else {
      this.BooksService.addUserBook(
        '65d9abb351fcf55837d66df8',
        this.id,
        event
      ).subscribe({
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
    this.BooksService.deleteUserBook(this.userBookData._id).subscribe({
      next: (res: any) => {
        this.userBookData = undefined;
      },
      error: (error: any) => {
        console.error('Error fetching the book:', error);
      },
    });
  }




  rate(rating: number) {
    console.log('Rating:', rating);
    this.selectedRating = rating; // Update selectedRating
    this.ReviewsService.postOrEditRating(this.userBookData._id, rating).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.error('Error in the rating functionality:', error);
      },
    });
  }


  getStars(avgRating: number): number[] {
    const roundedRating = Math.round(avgRating);
    return Array.from({ length: roundedRating }, () => 1);
  }

}
