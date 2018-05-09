import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { DataService } from './data.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private data: DataService) { }

    /**
     * Loads user data from server by token
     */
    getUser(): Observable<User> {
        let data = new FormData();
        data.append('token', localStorage.token);
        data.append('Content-Type', 'application/json');
        return this.http.post(this.data.API_URL_VERIFY, data);
    }
    /**
     * Returns users list
     */
    getUsers(): Observable<User[]> {
        let url = this.data.API_URL + '/api/users';
        return this.http.get<User[]>(url, httpOptions);
    }

    /**
     * Returns user data from localStorage
     */
    getUserLocal(): string {
        return JSON.parse(localStorage.getItem('user'));
    }

}
