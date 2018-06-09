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

    constructor(private matDialogRef: MatDialogRef<TaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private projectService: ProjectService) { }

    public statuses = ['In Progress', 'New', 'In Testing', 'Solved'];

    ngOnInit() { }

    submitted = false;

    addTask() {
        this.submitted = true;
        if (!this.task.name) {
            return;
        }
        this.task.project = this.data.projectId;
        this.projectService.addTask(this.task).subscribe(task => {
            this.matDialogRef.close();
        });
    }
}
