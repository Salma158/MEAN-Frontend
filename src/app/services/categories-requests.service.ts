import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRequestsService {

  constructor(private http: HttpClient) {}

    getAllCategories(): Observable <any>{
      return this.http.get('http://localhost:3000/categories');
    }
    getCategoryDetails(id: string, currentPage: number, limit: number): Observable<any>{
      let queryParams = new HttpParams().set('limitSize', limit).set('pageNumber', currentPage)
      return this.http.get(`http://localhost:3000/categories/${id}`, { params: queryParams });
    }
}
