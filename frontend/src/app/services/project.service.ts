import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { DataService } from './data.service';
import { Task } from '../models/task';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class ProjectService {
    project: Project;
    task: Task;

    constructor(private http: HttpClient,
        private data: DataService) { }

    private projectsUrl = this.data.API_URL + '/api/projects/';
    private projectUrl = this.data.API_URL + '/api/project/';
    private tasksUrl = this.data.API_URL + '/api/tasks/';

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.projectsUrl, httpOptions);
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.tasksUrl, httpOptions);
    }

    getProject(id): Observable<Project> {
        let getProjectUrl = this.data.API_URL + '/api/project/' + id + '/';
        return this.http.get<Project>(getProjectUrl, httpOptions).pipe(
            tap((project: Project) => this.project = project)
        );;
    }

    addProject(project: Project) {
        return this.http.post<Project>(this.projectsUrl, project, httpOptions);
    }

    addTask(task: Task) {
        return this.http.post<Task>(this.tasksUrl, task, httpOptions);
    }

    deleteProject(pk) {
        let url = this.projectUrl + pk + '/';
        return this.http.delete(url, pk);
    }

    deleteTask(pk) {
        let url = this.tasksUrl + pk + '/';
        return this.http.delete(url, pk);
    }
}
