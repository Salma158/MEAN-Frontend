import { Component, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-review',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-review.component.html',
  styleUrl: './book-review.component.css'
})
export class BookReviewComponent {
  @Input() id!: string;
  reviewText: string = '';
  
  constructor(private ReviewsService : ReviewsService){}

  postReview(){
    this.ReviewsService.addReview(this.id, this.reviewText).subscribe(
      {
        next: (res: any) => {
          console.log("review successfully added");
        },
        error: (error: any) => {
          console.error('Error adding the review:', error);
        },
      }
    );
  }
  fetchReviews(){
    this.ReviewsService.getReviews(this.id).subscribe(
      {
        next: (res: any) => {
          console.log("reviews successfully fetched", res);
        },
        error: (error: any) => {
          console.error('Error fetching the reviews:', error);
        },
      }
    )
  }
  

 
}
