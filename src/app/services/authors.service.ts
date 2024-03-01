import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  token = this.storageService.getUser()?.token;
  role = this.storageService.getUser()?.role;

 headers = new HttpHeaders({
   'Authorization': this.token,
   'role': this.role
 });
  constructor(private http :HttpClient , private storageService :StorageServiceService ) { }
  addbAuthors(categoryName:string ): Observable<any>{
    
    return this.http.post("https://goodreads-snxv.onrender.com/authors/",
      {
        categoryName
      },
      {headers:this.headers}
    
    );
  }
  deleteAuthors(id:string ): Observable<any>{

    return this.http.delete(`https://goodreads-snxv.onrender.com/authors/${id}`,
    {headers:this.headers}
    );
  }
 updateAuthors(id:string , categoryName:string ): Observable<any>{
    return this.http.patch(`https://goodreads-snxv.onrender.com/authors/${id}`,
    {categoryName},
    {headers:this.headers}
    );
  }

  getAllAuthors(): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/authors/`
    );
  }
  getOne(id:string): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/authors/${id}`)
  }
}
