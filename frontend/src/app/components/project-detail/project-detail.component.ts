import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getProject();
  }
  
  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }

  taskDialog() {
    this.dialog.open(TaskDialogComponent, {
      width: '50%'
    });    
  }

}
