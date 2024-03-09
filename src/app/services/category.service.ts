import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    baseURL = 'https://goodreads-snxv.onrender.com';
    token = this.storageService.getUser()?.token;
     role = this.storageService.getUser()?.role;

    headers = new HttpHeaders({
      'Authorization': this.token,
      'role': this.role
    });
  constructor(private http :HttpClient , private storageService :StorageServiceService ) { }
  addCategory(categoryName:string ): Observable<any>{
    
    return this.http.post(`${this.baseURL}/categories/`,
      {
        categoryName
      },
      {headers:this.headers}
    
    );
  }
  deleteCategory(id:string ): Observable<any>{

    return this.http.delete(`${this.baseURL}/categories/${id}`,
    {headers:this.headers}
    );
  }
 updateCategory(id:string , categoryName:string ): Observable<any>{
    return this.http.patch(`${this.baseURL}/categories/${id}`,
    {categoryName},
    {headers:this.headers}
    );
  }
  getAll(): Observable<any>{
    return this.http.get(`${this.baseURL}/categories/`
    );
  }
  getOne(id:string): Observable<any>{
    return this.http.get(`${this.baseURL}/categories/${id}`)
  }
    
}
