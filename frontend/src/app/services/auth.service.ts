import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../models/user';

export const TOKEN_NAME: string = 'jwt_token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  private BASE_URL: string = "http://localhost:8000/auth-jwt/";

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    return this.http.post(this.BASE_URL, user, httpOptions);
  }

  logout(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }

  register(user): Observable<any> {
    let url = `${this.BASE_URL}/register`
    return this.http.post(url, user, httpOptions);
  }

}
