import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http : HttpClient) {}

  getPopularBooks(): Observable<any>{
    return this.http.get("http://localhost:3000/books/popularBooks");
  }

  getUserBooks(user : string): Observable<any>{
    let queryParams = new HttpParams().set('user', user)
    return this.http.get("http://localhost:3000/userbooks", { params: queryParams })
  }

  getBooksByStatus(user: string, status: string, page: number, limit: number): Observable<any> {
    let queryParams = new HttpParams().set('user', user).set('status', status).set('page', page).set('limit' , limit)
    return this.http.get("http://localhost:3000/userbooks", { params: queryParams })
  }
  getBookById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/books/${id}`);
  }
  editUserBook(id: string, status: string): Observable<any> {
    console.log(id)
    return this.http.patch(`http://localhost:3000/userbooks/${id}`, { status })
  }
  deleteUserBook(id: string){
    return this.http.delete(`http://localhost:3000/userbooks/${id}`)
  }

  getUserBookById(user: string, book: string){
    return this.http.get(`http://localhost:3000/userbooks/${user}/${book}`);
  }
  addUserBook(user : string, book: string , status: string ){
    return this.http.post(`http://localhost:3000/userbooks`, {user, book, status})
  }
}
