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

 headers = new HttpHeaders({
   'Authorization': this.token,
   'role': this.role
 });
  constructor(private http :HttpClient , private storageService :StorageServiceService ) { }

  addbBook(formData:any ): Observable<any>{
    
    return this.http.post("https://goodreads-snxv.onrender.com/books/",
        formData
      ,
      {headers:this.headers}
    
    );
  }
  deleteBook(id:string ): Observable<any>{

    return this.http.delete(`https://goodreads-snxv.onrender.com/books/${id}`,
    {headers:this.headers}
    );
  }
 updateBook(id:string , formData:any ): Observable<any>{
    return this.http.patch(`https://goodreads-snxv.onrender.com/books/${id}`,
    formData,
    {headers:this.headers}
    );
  }
  getAllCategories(): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/categories/`
    );
  }
  getAllBooks(): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/books/`
    );
  }
  getAllAuthors(): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/authors/`
    );
  }
  getOne(id:string): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/books/${id}`)
  }

  getAllBooksPaginated(page: number, limit: number): Observable<any> {
    let queryParams = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get('https://localhost:3000/books', {
      params: queryParams,
    });
  }

  searchBook(searchBook: string): Observable<any> {
    let queryParams = new HttpParams().set('searchedBook', searchBook);
    return this.http.get('https://goodreads-snxv.onrender.com/searchBook', {
      params: queryParams,
    });
  }

  getPopularBooks(): Observable<any> {
    return this.http.get(
      'https://goodreads-snxv.onrender.com/books/popularBooks'
    );
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
    return this.http.get('https://goodreads-snxv.onrender.com/userbooks', {
      params: queryParams,
    });
  }

  getBookById(id: string): Observable<any> {
    return this.http.get(`https://goodreads-snxv.onrender.com/books/${id}`);
  }
  editUserBook(id: string, status: string): Observable<any> {
    console.log(id);
    return this.http.patch(
      `https://goodreads-snxv.onrender.com/userbooks/${id}`,
      { status }
    );
  }
  deleteUserBook(id: string) {
    return this.http.delete(
      `https://goodreads-snxv.onrender.com/userbooks/${id}`
    );
  }

  getUserBookById(user: string, book: string) {
    return this.http.get(
      `https://goodreads-snxv.onrender.com/userbooks/${user}/${book}`
    );
  }
  addUserBook(user: string, book: string, status: string) {
    return this.http.post(`https://goodreads-snxv.onrender.com/userbooks`, {
      user,
      book,
      status,
    });
  }

  getPopularAuthors(): Observable<any> {
    return this.http.get('https://goodreads-snxv.onrender.com/authors/popular');
  }
  getPopularCategories(): Observable<any> {
    return this.http.get(
      'https://goodreads-snxv.onrender.com/categories/popular'
    );
  }
}