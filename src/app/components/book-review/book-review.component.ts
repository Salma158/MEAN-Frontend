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
  @Input()  id!: string;
  reviewText: string = '';

  constructor(private reviewService: ReviewsService){}
  postReview(){
    this.reviewService.addReview(this.id, this.reviewText).subscribe(
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
}
