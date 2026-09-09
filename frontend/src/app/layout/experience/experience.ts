import { Component, OnInit } from '@angular/core';
import { IExperience } from '../../core/models/experience.model';
import { ExperienceService } from '../../core/services/experience-service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience implements OnInit {
  experiences: IExperience[] = [];
  loading = true;
  errorMessage = '';

  constructor(private readonly experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperience().subscribe({
      next: (data) => {
        this.experiences = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load experience. Please try again.';
      },
    });
  }
}
