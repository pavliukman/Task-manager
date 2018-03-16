import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() project: Project;
  projects: Project[];

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
  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.projectService.addProject({name} as Project)
      .subscribe(project => {
        this.projects.push(project);
      });
  }

  // edit project
  edit(): void {

  }

  // delete project
  delete(): void {

  }
}
