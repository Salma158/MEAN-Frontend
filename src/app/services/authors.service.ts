import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  baseURL = 'https://goodreads-snxv.onrender.com';
  
  token = this.storageService.getUser()?.token;
  role = this.storageService.getUser()?.role;
  headers = new HttpHeaders({
   'Authorization': this.token,
   'role': this.role
 });
  constructor(private http :HttpClient , private storageService :StorageServiceService ) { }
  addbAuthors(formData:any ): Observable<any>{
    
    return this.http.post(`${this.baseURL}/authors/`,
       formData
      ,
      {headers:this.headers}
    
    );
  }
  deleteAuthors(id:string ): Observable<any>{

    return this.http.delete(`${this.baseURL}/authors/${id}`,
    {headers:this.headers}
    );
  }
 updateAuthors(id:string , data:any ): Observable<any>{
    return this.http.patch(`${this.baseURL}/authors/${id}`,
    data,
    {headers:this.headers}
    );
  }

  getAllAuthors(): Observable<any>{
    return this.http.get(`${this.baseURL}/authors/`
    );
  }
  getOne(id:string): Observable<any>{
    return this.http.get(`${this.baseURL}/authors/${id}`)
  }
}
