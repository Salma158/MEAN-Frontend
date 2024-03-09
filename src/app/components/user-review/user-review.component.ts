import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-review',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css'
})
export class UserReviewComponent {
  @Input() userBookData!: any;
  @Input() bookId! : any;
  usersReviews: any;

  constructor(private reviewsService: ReviewsService) { }

  ngOnChanges() {
      this.reviewsService.getReviews(this.bookId).subscribe({
        next: (res: any) => {
          console.log("Reviews successfully fetched", res);
          this.usersReviews = res.data.bookReviews
        },
        error: (error: any) => {
          console.error('Error fetching the reviews:', error);
        },
      });
  }
}