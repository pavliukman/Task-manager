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
    private taskUrl = this.data.API_URL + '/api/task/';

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.projectsUrl, httpOptions);
    }

    getProject(id): Observable<Project> {
        return this.http.get<Project>(this.projectUrl + id + '/', httpOptions).pipe(
            tap((project: Project) => this.project = project)
        );;
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.tasksUrl, httpOptions);
    }

    getTask(id): Observable<Task> {
        return this.http.get<Task>(this.taskUrl + id + '/', httpOptions);
    }

    addProject(project: Project) {
        return this.http.post<Project>(this.projectsUrl, project, httpOptions);
    }

    addTask(task: Task) {
        return this.http.post<Task>(this.tasksUrl, task, httpOptions);
    }

    editTask(task: Task, pk) {
        return this.http.put<Task>(this.taskUrl + pk + '/', task, httpOptions);
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
