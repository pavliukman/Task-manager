import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-project-edit',
	templateUrl: './project-edit.component.html',
	styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
	displaySearchBox: boolean = false;
	displayNoResults: boolean = false;
	users: User[];
	project: Project = new Project();
	projectForm = new FormGroup({
		name: new FormControl(''),
		description: new FormControl(''),
		assigned_to: new FormControl(''),
	});

	constructor(private projectService: ProjectService,
		private route: ActivatedRoute,
		private userService: UserService,
		public snackBar: MatSnackBar,
		private location: Location) { }

	ngOnInit() {
		this.projectService.getProject(this.route.snapshot.paramMap.get('id')).subscribe(project => {
			this.project = project;

			this.projectForm.patchValue({
				name: project.name,
				description: project.description,
			});
		});
	}

	backClicked() {
		this.location.back();
		return;
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	removeUser(id) {
		let deletingUser;
		let index = this.project.assigned_to.indexOf(id);
		this.project.assigned_to.splice(index, 1);
		this.project.assigned_to_users_object = this.project.assigned_to_users_object.filter(function (user) {
			if (user.id == id) deletingUser = user;
			return user.id != id;
		})

		this.projectService.editProject(this.project).subscribe(() => {
			this.openSnackBar(this.userToString(deletingUser) + ' removed from project.', '')
		});
	}

	searchUsers(event) {
		let searchQuery = event.target.value;
		if (searchQuery.length < 3) {
			this.displaySearchBox = false;
			return;
		};
		this.displaySearchBox = true;

		this.userService.getUsersBySearchQuery(searchQuery, this.project.assigned_to).subscribe(users => {
			if (users.length == 0) {
				this.users = [];
				this.displayNoResults = true;
				return;
			};
			this.displayNoResults = false;
			this.users = users;
		});
	}

	selectValue(user) {
		this.project.assigned_to.push(user.id);
		this.displaySearchBox = false
		this.projectService.editProject(this.project).subscribe(() => {
			this.project.assigned_to_users_object.push(user);
			this.openSnackBar(this.userToString(user) + ' added to project.', '')
		});
	}

	/**
	* Gets user and returns user first name, last name and username
	* @param user - user object
	*/
	userToString(u): string {
		if (!u) return;
		return u.first_name && u.last_name ? u.first_name + ' ' + u.last_name + ' <' + u.username + '>' : u.username;
	}

	submit(projectForm) {
		this.project.name = projectForm.name;
		this.project.description = projectForm.description;
		this.projectService.editProject(this.project).subscribe(() => this.openSnackBar('Project successfully saved!', ''));
	}

}
