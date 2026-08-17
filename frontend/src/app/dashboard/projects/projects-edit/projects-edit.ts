import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProject } from '../../../core/models/projects.model';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-projects-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './projects-edit.html',
  styleUrl: './projects-edit.css',
})
export class ProjectsEdit implements OnInit {
  myForm!: FormGroup;
  projectId = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
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

    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.getProject();
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

  getProject(): void {
    this.projectsService.getProjectById(this.projectId).subscribe({
      next: (data: IProject) => {
        this.myForm.patchValue({
          title: data.title,
          description: data.description,
          github: data.github,
          livedemo: data.livedemo,
        });

        this.technologies.clear();

        (data.technologies?.length ? data.technologies : ['']).forEach(tech =>
          this.technologies.push(new FormControl(tech, Validators.required))
        );

        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load project';
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

    this.projectsService.updateProject(this.projectId, this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Project updated successfully';
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to update project';
        this.cdr.detectChanges();
      },
    });
  }
}