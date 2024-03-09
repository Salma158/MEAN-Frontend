import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsRequestsService {

  baseURL = 'https://goodreads-snxv.onrender.com';

  constructor(private http: HttpClient) {}

    getAllAuthors(currentPage: number, limit: number): Observable <any> {
      let queryParams = new HttpParams().set('limiSize', limit).set('pageNumber', currentPage)
      return this.http.get(`${this.baseURL}/authors`, { params: queryParams });
    }
    getAuthorDetails(id: string): Observable <any> {
      return this.http.get(`${this.baseURL}/user/authors/${id}`);
    }
}
