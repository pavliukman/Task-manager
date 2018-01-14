import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class UserService {

  private url = '';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get(this.url);
  }

}
