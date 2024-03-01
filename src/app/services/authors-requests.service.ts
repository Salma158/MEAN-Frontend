import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsRequestsService {

  constructor(private http: HttpClient) {}

    getAllAuthors(currentPage: number, limit: number): Observable <any> {
      let queryParams = new HttpParams().set('limiSize', limit).set('pageNumber', currentPage)
      return this.http.get('https://goodreads-snxv.onrender.com/authors', { params: queryParams });
    }
    getAuthorDetails(id: string): Observable <any> {
      return this.http.get(`https://goodreads-snxv.onrender.com/user/authors/${id}`);
    }
}
