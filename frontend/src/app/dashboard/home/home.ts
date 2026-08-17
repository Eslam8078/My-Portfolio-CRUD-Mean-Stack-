import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HomeService } from '../../core/services/home-service';

@Component({
  selector: 'app-dashboard-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    github: new FormControl(''),
    linkedin: new FormControl(''),
    image: new FormControl<File | null>(null),
    resume: new FormControl<File | null>(null),
  });

  resumeUrl = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: data => {
        this.myForm.patchValue({
          name: data.name || '',
          title: data.title || '',
          description: data.description || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
        });

        this.resumeUrl = data.resumeUrl || '';
        this.cdr.detectChanges();
      },

      error: () => {
        this.errorMessage = 'Failed to load Home';
        this.cdr.detectChanges();
      },
    });
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.myForm.controls.image.setValue(file);
    }
  }

  onResumeChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.myForm.controls.resume.setValue(file);
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const data = this.myForm.getRawValue();
    const formData = new FormData();

    formData.append('name', data.name || '');
    formData.append('title', data.title || '');
    formData.append('description', data.description || '');
    formData.append('github', data.github || '');
    formData.append('linkedin', data.linkedin || '');

    if (data.image) {
      formData.append('image', data.image);
    }

    if (data.resume) {
      formData.append('resume', data.resume);
    }

    this.homeService.updateHome(formData).subscribe({
      next: response => {
        this.successMessage = 'Home updated successfully!';

        this.resumeUrl = response.resumeUrl || this.resumeUrl;

        this.cdr.detectChanges();
      },

      error: error => {
        console.error(error);
        this.errorMessage = 'Failed to update Home';
        this.cdr.detectChanges();
      },
    });
  }
}