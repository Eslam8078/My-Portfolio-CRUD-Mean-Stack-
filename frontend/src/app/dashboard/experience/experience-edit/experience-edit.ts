import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IExperience } from '../../../core/models/experience.model';
import { ExperienceService } from '../../../core/services/experience-service';

@Component({
  selector: 'app-experience-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './experience-edit.html',
  styleUrl: './experience-edit.css',
})
export class ExperienceEdit implements OnInit {
  myForm!: FormGroup;
  experienceId = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private experienceService: ExperienceService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      period: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      highlights: new FormArray([this.newHighlight()]),
    });

    this.experienceId = this.route.snapshot.paramMap.get('id') || '';
    this.getExperience();
  }

  newHighlight() {
    return new FormControl('', Validators.required);
  }

  get highlights(): FormArray {
    return this.myForm.get('highlights') as FormArray;
  }

  addHighlight(): void {
    this.highlights.push(this.newHighlight());
  }

  removeHighlight(index: number): void {
    if (this.highlights.length > 1) this.highlights.removeAt(index);
  }

  getExperience(): void {
    this.experienceService.getExperienceById(this.experienceId).subscribe({
      next: (data: IExperience) => {
        this.myForm.patchValue({
          title: data.title,
          company: data.company,
          period: data.period,
          location: data.location,
        });

        this.highlights.clear();
        (data.highlights?.length ? data.highlights : ['']).forEach(h =>
          this.highlights.push(new FormControl(h, Validators.required))
        );

        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load experience';
        this.cdr.detectChanges();
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

    this.experienceService.updateExperience(this.experienceId, this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Experience updated successfully';
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to update experience';
        this.cdr.detectChanges();
      },
    });
  }
}
