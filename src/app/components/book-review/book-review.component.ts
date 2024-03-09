import { Component, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-review',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-review.component.html',
  styleUrl: './book-review.component.css'
})
export class BookReviewComponent {
  @Input()  userBookId!: string;
  reviewText: string = '';

  constructor(private reviewService: ReviewsService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.userBookId = segments[3]?.toString();
      console.log(this.userBookId)
    });
  }

  postReview(){
    console.log(this.userBookId)
    console.log(this.reviewText)
    this.reviewService.addReview(this.userBookId, this.reviewText).subscribe(
      {
        next: (res: any) => {
          console.log("review successfully added")
        },
        error: (error: any) => {
          console.error('Error adding the review:', error);
        },
      }
    );
  }
}
