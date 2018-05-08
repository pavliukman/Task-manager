import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    project = new Project();
    projects: Project[];
    displayedColumns = ['name', 'description', 'action'];
    projectForm: FormGroup;

    constructor(private projectService: ProjectService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.getProjects();
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe(projects =>
                this.projects = projects
            );
    }

    // add new project
    add(): void {
        if (!this.project.name) {
            return;
        }
        this.projectService.addProject(this.project).subscribe(project => {
            this.getProjects();
            this.project.name = '';
            this.project.description = '';
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
