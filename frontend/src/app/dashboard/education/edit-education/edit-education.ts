import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IEducation } from '../../../core/models/education.model';
import { EducationService } from '../../../core/services/education-service';

@Component({
  selector: 'app-edit-education',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-education.html',
  styleUrl: './edit-education.css',
})
export class EditEducation implements OnInit {
  myForm!: FormGroup;
  educationId = '';

  successMessage = '';
  errorMessage = '';

  constructor(
    private educationService: EducationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      degree: new FormControl('', Validators.required),
      university: new FormControl('', Validators.required),
      period: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.educationId = this.route.snapshot.paramMap.get('id') || '';

    this.getEducation();
  }

  getEducation(): void {
    this.educationService.getEducationById(this.educationId).subscribe({
      next: (data: IEducation) => {
        this.myForm.patchValue(data);
      },

      error: () => {
        this.errorMessage = 'Failed to load education';
      },
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      return;
    }

    this.educationService.updateEducation(this.educationId, this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Education updated successfully';
      },

      error: () => {
        this.errorMessage = 'Failed to update education';
      },
    });
  }
}
