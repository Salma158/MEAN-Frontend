import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  token = this.storageService.getUser()?.token;
  role = this.storageService.getUser()?.role;
  baseURL = 'https://goodreads-snxv.onrender.com';

  headers = new HttpHeaders({
    Authorization: this.token,
    role: this.role,
  });
  constructor(
    private http: HttpClient,
    private storageService: StorageServiceService
  ) {}

  addbBook(formData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/books/`, formData, {
      headers: this.headers,
    });
  }
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/books/${id}`, {
      headers: this.headers,
    });
  }
  updateBook(id: string, formData: any): Observable<any> {
    return this.http.patch(`${this.baseURL}/books/${id}`, formData, {
      headers: this.headers,
    });
  }
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseURL}/categories/`);
  }
  getAllBooks(): Observable<any> {
    return this.http.get(`${this.baseURL}/books/`);
  }
  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.baseURL}/authors/`);
  }
  getOne(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  getAllBooksPaginated(page: number, limit: number): Observable<any> {
    let queryParams = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get(`${this.baseURL}/books`, {
      params: queryParams,
    });
  }

  searchBook(searchBook: string): Observable<any> {
    let queryParams = new HttpParams().set('searchedBook', searchBook);
    return this.http.get(`${this.baseURL}/books/searchBook`, {
      params: queryParams,
    });
  }

  getPopularBooks(): Observable<any> {
    return this.http.get(`${this.baseURL}/books/popularBooks`);
  }

  getBooksByStatus(
    user: string,
    status: string,
    page: number,
    limit: number
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('user', user)
      .set('status', status)
      .set('limit', limit)
      .set('page', page);
    return this.http.get(`${this.baseURL}/userbooks`, {
      params: queryParams,
    });
  }

  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/books/${id}`);
  }
  editUserBook(id: string, status: string): Observable<any> {
    console.log(id);
    return this.http.patch(
      `${this.baseURL}/userbooks/${id}`,
      { status }
    );
  }
  deleteUserBook(id: string) {
    return this.http.delete(
      `${this.baseURL}/userbooks/${id}`
    );
  }

  getUserBookById(user: string, book: string) {
    console.log("salma")
    return this.http.get(
      `${this.baseURL}/userbooks/${user}/${book}`
    );
  }
  addUserBook(user: string, book: string) {
    return this.http.post(`${this.baseURL}/userbooks`, {
      user,
      book
    });
  }

  getPopularAuthors(): Observable<any> {
    return this.http.get(`${this.baseURL}/authors/popular`);
  }
  getPopularCategories(): Observable<any> {
    return this.http.get(
      `${this.baseURL}/categories/popular`
    );
  }
}
