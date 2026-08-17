import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProject } from '../../../core/models/projects.model';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-projects-list',
  imports: [RouterLink],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.css',
})
export class ProjectsList implements OnInit {
  projects: IProject[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: data => {
        this.projects = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load projects';
        this.cdr.detectChanges();
      },
    });
  }

  deleteProject(id: string): void {
    if (!confirm('Are you sure you want to delete this project?')) return;

    this.successMessage = '';
    this.errorMessage = '';

    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.successMessage = 'Project deleted successfully';
        this.getProjects();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to delete project';
        this.cdr.detectChanges();
      },
    });
  }
}