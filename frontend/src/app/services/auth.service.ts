import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { DataService } from './data.service';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, 
              private router: Router,
              private data: DataService) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    return this.http.post(this.data.API_URL_AUTH, user, httpOptions);
  }

  logout(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }

  register(user): Observable<any> {
    return this.http.post(this.data.API_URL_AUTH, user, httpOptions);
  }

  isLoggedIn() : Promise<any>{
    return this.http.post(this.data.API_URL_VERIFY, {token: this.getToken()}, httpOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
