import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    token = this.storageService.getUser()?.token;
     role = this.storageService.getUser()?.role;

    headers = new HttpHeaders({
      'Authorization': this.token,
      'role': this.role
    });
  constructor(private http :HttpClient , private storageService :StorageServiceService ) { }
  addCategory(categoryName:string ): Observable<any>{
    
    return this.http.post("https://goodreads-snxv.onrender.com/categories/",
      {
        categoryName
      },
      {headers:this.headers}
    
    );
  }
  deleteCategory(id:string ): Observable<any>{

    return this.http.delete(`https://goodreads-snxv.onrender.com/categories/${id}`,
    {headers:this.headers}
    );
  }
 updateCategory(id:string , categoryName:string ): Observable<any>{
    return this.http.patch(`https://goodreads-snxv.onrender.com/categories/${id}`,
    {categoryName},
    {headers:this.headers}
    );
  }
  getAll(): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/categories/`
    );
  }
  getOne(id:string): Observable<any>{
    return this.http.get(`https://goodreads-snxv.onrender.com/categories/${id}`)
  }
    
}
