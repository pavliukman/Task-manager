import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    project = new Project();
    users: User[];
    projects: Project[];
    displayedColumns = ['name', 'description', 'action'];
    projectForm: FormGroup;

    constructor(private projectService: ProjectService,
        private route: ActivatedRoute,
        private userService: UserService) { }

    ngOnInit() {
        this.getProjects();
        this.getUsers();
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe(projects =>
                this.projects = projects
            );
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(users =>
            this.users = users
        );
    }

    // add new project
    add(form: NgForm): void {
        if (!this.project.name) {
            return;
        }
        this.projectService.addProject(this.project).subscribe(project => {
            this.getProjects();
            this.getUsers();
            form.resetForm()
        });
    }

    // edit project
    edit(): void {

    }

    // delete project
    delete(id): void {
        let confirmation = confirm('Are you sure?');
        if (confirmation) {
            this.projectService.deleteProject(id).subscribe(data => {
                this.getProjects();
            });
        }
    }
}
