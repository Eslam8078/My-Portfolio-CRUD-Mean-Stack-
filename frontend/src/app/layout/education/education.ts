import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private educationService: EducationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe({
      next: (data) => {
        this.educations = data ;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load education. Please try again.';
        this.cdr.detectChanges();
      },
    });
  }
}
