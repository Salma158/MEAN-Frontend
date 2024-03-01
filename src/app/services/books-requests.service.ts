import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksRequestsService {

  constructor(private http: HttpClient) {}

  getAllBooks(currentPage: number, limit: number): Observable <any>{
    let queryParams = new HttpParams().set('limit', limit).set('page', currentPage)
    return this.http.get("https://goodreads-snxv.onrender.com/books", { params: queryParams });
  }
  
  
}
