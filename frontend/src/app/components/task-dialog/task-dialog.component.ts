import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { EventEmitter } from 'events';

@Component({
	selector: 'app-task-dialog',
	templateUrl: './task-dialog.component.html',
	styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
	task = new Task();
	taskFrom: FormGroup;
	submitted: boolean = false;

	constructor(private matDialogRef: MatDialogRef<TaskDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private projectService: ProjectService) { }

	public statuses = ['In Progress', 'New', 'In Testing', 'Solved'];

	ngOnInit() {
		if (this.data.action) {
			this.projectService.getTask(this.data.id).subscribe(task => {
				this.task = task;
			});
		}
	}

	submit() {
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
		this.projectService.addTask(this.task).subscribe(task => {
			this.matDialogRef.close();
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
