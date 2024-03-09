import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksRequestsService {

  baseURL = 'https://goodreads-snxv.onrender.com';

  constructor(private http: HttpClient) {}

  getAllBooks(currentPage: number, limit: number): Observable <any>{
    let queryParams = new HttpParams().set('limit', limit).set('page', currentPage)
    return this.http.get(`${this.baseURL}/books`, { params: queryParams });
  }
  
  
}
