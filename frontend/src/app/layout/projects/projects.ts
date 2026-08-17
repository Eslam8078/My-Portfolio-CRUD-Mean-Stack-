import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProject } from '../../core/models/projects.model';
import { ProjectsService } from '../../core/services/projects-service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects: IProject[] = [];
  loading = true;
  errorMessage = '';

  constructor(private projectsService: ProjectsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data ;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load projects. Please try again.';
        this.cdr.detectChanges();
      },
    });
  }


}
