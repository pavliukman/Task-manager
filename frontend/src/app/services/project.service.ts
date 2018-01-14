import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ProjectService {
  private url = 'http://localhost:8000/api/projects';
  project: Project[];

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url, httpOptions);
  }

  addProject(project: Project) {
    return this.http.post<Project>(this.url, project, httpOptions);
  }

}
