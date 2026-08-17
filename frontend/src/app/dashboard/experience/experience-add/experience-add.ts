import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ExperienceService } from '../../../core/services/experience-service';

@Component({
  selector: 'app-experience-add',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './experience-add.html',
  styleUrl: './experience-add.css',
})
export class ExperienceAdd implements OnInit {
  myForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private experienceService: ExperienceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      period: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      highlights: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  get highlights() {
    return this.myForm.get('highlights') as FormArray;
  }

  addHighlight(): void {
    this.highlights.push(new FormControl('', Validators.required));
  }

  removeHighlight(index: number): void {
    if (this.highlights.length > 1) {
      this.highlights.removeAt(index);
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.experienceService.addExperience(this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Experience added successfully';
        this.myForm.reset();
        this.highlights.clear();
        this.addHighlight();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to add experience';
        this.cdr.detectChanges();
      },
    });
  }
}


