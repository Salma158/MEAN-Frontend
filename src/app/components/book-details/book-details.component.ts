import { Component, Input } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ReviewsService } from '../../services/reviews.service';
import { CommonModule } from '@angular/common';
import { StorageServiceService } from '../../services/storage-service.service';
import { BookDescriptionComponent } from '../book-description/book-description.component';
import { BookInfoComponent } from '../book-info/book-info.component';
import { UserReviewComponent } from '../user-review/user-review.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    FontAwesomeModule,
    CommonModule,
    BookDescriptionComponent,
    BookInfoComponent,
    UserReviewComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  @Input() id!: string;
  userId!: string;
  bookData: any;
  userBookData!: any;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.userId = window.localStorage.getItem('userId') || '';

    this.booksService.getUserBookById(this.userId, this.id).subscribe({
      next: (res: any) => {
        this.userBookData = res?.data?.userBook;
      },
      error: () => {
        this.userBookData = null;
        
      },
    });

    this.booksService.getBookById(this.id).subscribe({
      next: (res: any) => {
        this.bookData = res?.data?.book;
        console.log(this.bookData)
      },
      error: (error: any) => {
        console.error('Error fetching the book:', error);
      },
    });

    
  }
}
