import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from './project';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable()
export class ProjectService {
  private url = 'http://localhost:8000/api/projects';
  project: Project[];

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    console.log(httpOptions);
    return this.http.get<Project[]>(this.url, httpOptions);
  }

  addProject(project: Project) {
    return this.http.post<Project>(this.url, project, httpOptions);
  }

}
