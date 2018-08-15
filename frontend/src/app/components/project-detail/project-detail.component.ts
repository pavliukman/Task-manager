import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Task } from '../../models/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Component({
	selector: 'app-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
	project: Project;
	displayedColumns = ['name', 'description', 'status', 'estimatedTime', 'action'];
	isLoading: boolean = true;

	constructor(private route: ActivatedRoute,
		private projectService: ProjectService,
		public dialog: MatDialog) { }


	ngOnInit() {
		// Project initialization
		this.getProject();
		this.route.snapshot.data['title'] = 'this.project.name';
	}

    /**
     * Retrieve projects
     */
	getProject() {
		let tasks;
		const id = this.route.snapshot.paramMap.get('id');
		this.projectService.getProject(id).subscribe(data => {
			this.project = data;
			//this.isLoading = false;
		});
	}

    /**
     * Opens add task dialog
     */
	taskDialog(id?, action?) {
		let dialog = this.dialog.open(TaskDialogComponent, {
			data: {
				projectId: this.project.id,
				action: action || '',
				id: id || ''
			}
		});

		dialog.afterClosed().subscribe(result => {
			this.getProject();
		});
	}

    /**
     * Delete task by id
     * @param id
     */
	deleteTask(id: number) {
		let confirmation = confirm('Are you sure?');
		if (confirmation) {
			this.projectService.deleteTask(id).subscribe(data => {
				this.getProject();
			});
		}
	}
}