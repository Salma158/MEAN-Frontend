import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http : HttpClient) {}
  
   //works for editing review by id
  addReview(id: string, review: string): Observable<any> {
    return this.http.patch(`https://goodreads-snxv.onrender.com/userbooks/${id}`, { review })
  }

  getReviews(book : string): Observable<any> {
    return this.http.get(`https://goodreads-snxv.onrender.com/userbooks/reviews/${book}`)
  }


  postOrEditRating(id: string, rating : number): Observable<any> {
    return this.http.patch(`https://goodreads-snxv.onrender.com/userbooks/${id}`, {rating})
  }

  getAvgRating(bookId: string): Observable<any> {
    return this.http.get(`hhttps://goodreads-snxv.onrender.com/books/avgRating/${bookId}`)
  }

}
