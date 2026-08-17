import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SkillsService } from '../../../core/services/skills-service';

@Component({
  selector: 'app-skills-add',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './skills-add.html',
  styleUrl: './skills-add.css',
})
export class SkillsAdd implements OnInit {
  myForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private skillsService: SkillsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      level: new FormControl(50, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.skillsService.addSkill(this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Skill added successfully';
        this.myForm.reset({ level: 50 });
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to add skill';
        this.cdr.detectChanges();
      },
    });
  }
}
