import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRequestsService {

  baseURL = 'https://goodreads-snxv.onrender.com';

  constructor(private http: HttpClient) {}

    getAllCategories(): Observable <any>{
      return this.http.get(`${this.baseURL}/categories`);
    }
    getCategoryDetails(id: string, currentPage: number, limit: number): Observable<any>{
      let queryParams = new HttpParams().set('limitSize', limit).set('pageNumber', currentPage)
      return this.http.get(`${this.baseURL}/categories/${id}`, { params: queryParams });
    }
}
