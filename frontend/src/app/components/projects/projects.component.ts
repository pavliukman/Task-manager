import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

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
	isLoading: boolean = true;

	constructor(private projectService: ProjectService,
		private userService: UserService,
		private titleService: Title,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.getProjects();
		this.getUsers();
		this.titleService.setTitle('Projects');
	}



	getProjects(): void {
		this.projectService.getProjects()
			.subscribe(projects => {
				this.projects = projects;
				this.isLoading = false;
			}, error => {
				this.snackBar.open('Server connection error', '', {
					duration: 10000,
				});
			});
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
