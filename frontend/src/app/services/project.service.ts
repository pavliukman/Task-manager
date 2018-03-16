import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { DataService } from './data.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ProjectService {
  project: Project[];

  constructor(private http: HttpClient,
              private data: DataService) { }

  private url = this.data.API_URL + '/api/projects/';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url, httpOptions);
  }

  getProject(id): Observable<Project> {
    let url = this.data.API_URL + '/api/project/' + id + '/';
    console.log(url);
    return this.http.get<Project>(url, httpOptions);
  }

  addProject(project: Project) {
    return this.http.post<Project>(this.url, project, httpOptions);
  }

}
