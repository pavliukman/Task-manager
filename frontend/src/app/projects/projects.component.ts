import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects =>
        this.projects = projects
      );
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.projectService.addProject({name} as Project)
      .subscribe(project => {
        this.projects.push(project);
      });
  }
}
