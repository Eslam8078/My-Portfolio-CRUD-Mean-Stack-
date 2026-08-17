import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EducationService } from '../../../core/services/education-service';

@Component({
  selector: 'app-add-education',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-education.html',
  styleUrl: './add-education.css',
})
export class AddEducation implements OnInit {

  myForm!: FormGroup;

  successMessage = '';
  errorMessage = '';

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      degree: new FormControl('', Validators.required),
      university: new FormControl('', Validators.required),
      period: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.educationService.addEducation(this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Education added successfully';
        this.myForm.reset();
      },

      error: () => {
        this.errorMessage = 'Failed to add education';
      },
    });
  }
}