import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IExperience } from '../../../core/models/experience.model';
import { ExperienceService } from '../../../core/services/experience-service';

@Component({
  selector: 'app-experience-list',
  imports: [RouterLink],
  templateUrl: './experience-list.html',
  styleUrl: './experience-list.css',
})
export class ExperienceList implements OnInit {

  experiences: IExperience[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(
    private experienceService: ExperienceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getExperience();
  }

  getExperience(): void {
    this.experienceService.getExperience().subscribe({
      next: (data) => {
        this.experiences = data;
        this.cdr.detectChanges();
      },

      error: () => {
        this.errorMessage = 'Failed to load experience';
        this.cdr.detectChanges();
      },
    });
  }

  deleteExperience(id: string): void {

    if (!confirm('Are you sure you want to delete this experience?')) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.experienceService.deleteExperience(id).subscribe({
      next: () => {
        this.successMessage = 'Experience deleted successfully';

        this.getExperience();

        this.cdr.detectChanges();
      },

      error: () => {
        this.errorMessage = 'Failed to delete experience';

        this.cdr.detectChanges();
      },
    });
  }
}