import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseURL = 'https://goodreads-snxv.onrender.com';

  
  constructor(private http : HttpClient) {}
  
   //works for editing review by id
  addReview(id: string, review: string): Observable<any> {
    return this.http.patch(`${this.baseURL}/userbooks/${id}`, { review })
  }

  getReviews(book : string): Observable<any> {
    return this.http.get(`${this.baseURL}/userbooks/reviews/${book}`)
  }


  postOrEditRating(id: string, rating : number): Observable<any> {
    return this.http.patch(`${this.baseURL}/userbooks/${id}`, {rating})
  }

  getAvgRating(bookId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/books/avgRating/${bookId}`)
  }

}
