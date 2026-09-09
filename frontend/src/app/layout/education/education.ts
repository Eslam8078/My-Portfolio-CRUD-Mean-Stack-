import { Component, OnInit } from '@angular/core';
import { IEducation } from '../../core/models/education.model';
import { EducationService } from '../../core/services/education-service';

@Component({
  selector: 'app-education',
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education implements OnInit {
  educations: IEducation[] = [];
  loading = true;
  errorMessage = '';

  constructor(private readonly educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe({
      next: (data) => {
        this.educations = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load education. Please try again.';
      },
    });
  }
}
