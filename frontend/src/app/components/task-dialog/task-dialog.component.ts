import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-task-dialog',
	templateUrl: './task-dialog.component.html',
	styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
	taskForm = new FormGroup({
		name: new FormControl(''),
		assigned_to: new FormControl(),
		status: new FormControl(),
		estimatedTime: new FormControl(),
		description: new FormControl(),
	});

	task = new Task();
	assignees: User[];
	submitted: boolean = false;
	filteredOptions: Observable<User[]>;
	@ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

	constructor(private matDialogRef: MatDialogRef<TaskDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private projectService: ProjectService,
		private userService: UserService) { }

	public statuses = ['In Progress', 'New', 'In Testing', 'Solved'];

	ngOnInit() {
		this.getUsers();
		if (this.data.action) {
			this.projectService.getTask(this.data.id).subscribe(task => {
				this.task = task;
				this.taskForm.patchValue({
					name: task.name,
					status: task.status,
					assigned_to: this.task.assigned_to_user,
					estimatedTime: task.estimatedTime,
					description: task.description,
				});
			});
		}
	}

	displayFn(assignee: User): string | undefined {
		if (!assignee) return;
		return assignee.first_name && assignee.last_name ? assignee.first_name + ' ' + assignee.last_name + ' <' + assignee.username + '>' : assignee.username;
	}

	/**
	 * Gets assignee by id and returns assignee first name, last name and username
	 * @param id
	 */
	assigneeToString(id): string {
		if (!id) return;
		this.task.assigned_to = id;
		let assignee = this.assignees.find(user => user.id === id);
		return assignee.first_name && assignee.last_name ? assignee.first_name + ' ' + assignee.last_name + ' <' + assignee.username + '>' : assignee.username;
	}

	private _filter(name: string): User[] {
		return this.assignees.filter(option => option.username.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}

	/**
	 * Save task data
	 * @param taskForm
	 */
	submit(taskForm) {
		this.task.name = taskForm.name;
		this.task.status = taskForm.status;
		this.task.assigned_to = taskForm.assigned_to.id;
		this.task.estimatedTime = taskForm.estimatedTime;
		this.task.description = taskForm.description;
		this.submitted = true;

		let action = this.data.action;

		// decide what to do with task, add or edit
		if (action == 'edit') {
			this.editTask();
		} else {
			this.addTask();
		}
	}

	/**
	 * Adds task to project
	 */
	addTask() {
		if (!this.task.name) {
			return;
		}
		this.task.project = this.data.projectId;
		this.projectService.addTask(this.task).subscribe(() => {
			this.matDialogRef.close();
		});
	}

	getUsers(): void {
		this.userService.getUsers().subscribe(users => {
			this.assignees = users;
			let assignedToFormControl = this.taskForm.get('assigned_to') as FormGroup;
			this.filteredOptions = assignedToFormControl.valueChanges
				.pipe(
					startWith<string | User>(''),
					map(value => typeof value === 'string' ? value : value.username),
					map(name => name ? this._filter(name) : this.assignees.slice())
				);
		});
	}

	/**
	 * Edits task in project
	 */
	editTask() {
		this.projectService.editTask(this.task, this.data.id).subscribe(data => {
			this.matDialogRef.close();
		});
	}
}
