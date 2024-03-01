import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }

  logIn(userName: string, password: string): Observable<any> {
    
    return this.http.post("https://goodreads-snxv.onrender.com/user/login", {
      userName,
      password
    });
  }

  signUp(formData: any): Observable<any> {
    const headers = new HttpHeaders();
    
    return this.http.post("https://goodreads-snxv.onrender.com/user/", formData, { headers });
  }
}
