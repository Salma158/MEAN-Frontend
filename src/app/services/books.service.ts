import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
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
}
