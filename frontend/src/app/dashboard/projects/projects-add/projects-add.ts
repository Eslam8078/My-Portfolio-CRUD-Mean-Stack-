import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-projects-add',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './projects-add.html',
  styleUrl: './projects-add.css',
})
export class ProjectsAdd implements OnInit {
  myForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      github: new FormControl(''),
      livedemo: new FormControl(''),
      technologies: new FormArray([this.newTech()]),
    });
  }

  newTech() {
    return new FormControl('', Validators.required);
  }

  get technologies(): FormArray {
    return this.myForm.get('technologies') as FormArray;
  }

  addTech(): void {
    this.technologies.push(this.newTech());
  }

  removeTech(index: number): void {
    if (this.technologies.length > 1) this.technologies.removeAt(index);
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.projectsService.addProject(this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Project added successfully';
        this.myForm.reset();
        this.technologies.clear();
        this.addTech();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to add project';
        this.cdr.detectChanges();
      },
    });
  }
}

