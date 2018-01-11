import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  private BASE_URL: string = "http://localhost:8000/auth-jwt/";

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(user): Observable<any> {
    let url = `${this.BASE_URL}/login`;
    return this.http.post(url, user, httpOptions);
  }

  register(user): Observable<any> {
    let url = `${this.BASE_URL}/register`
    return this.http.post(url, user, httpOptions);
  }

}
