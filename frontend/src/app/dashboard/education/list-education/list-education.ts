import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IEducation } from '../../../core/models/education.model';
import { EducationService } from '../../../core/services/education-service';

@Component({
  selector: 'app-list-education',
  imports: [RouterLink],
  templateUrl: './list-education.html',
  styleUrl: './list-education.css',
})
export class ListEducation implements OnInit {
  educations: IEducation[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.getEducation();
  }

  getEducation(): void {
    this.educationService.getEducation().subscribe({
      next: (data) => {
        this.educations = data;
      },

      error: () => {
        this.errorMessage = 'Failed to load education';
      },
    });
  }

  deleteEducation(id: string): void {
    if (!confirm('Are you sure you want to delete this education?')) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.educationService.deleteEducation(id).subscribe({
      next: () => {
        this.successMessage = 'Education deleted successfully';

        this.getEducation();
      },

      error: () => {
        this.errorMessage = 'Failed to delete education';
      },
    });
  }
}
