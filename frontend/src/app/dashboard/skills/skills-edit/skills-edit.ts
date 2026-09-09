import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ISkill } from '../../../core/models/skills.model';
import { SkillsService } from '../../../core/services/skills-service';

@Component({
  selector: 'app-skills-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './skills-edit.html',
  styleUrl: './skills-edit.css',
})
export class SkillsEdit implements OnInit {
  myForm!: FormGroup;
  skillId = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private skillsService: SkillsService,
    private route: ActivatedRoute
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

    this.skillId = this.route.snapshot.paramMap.get('id') || '';
    this.getSkill();
  }

  getSkill(): void {
    this.skillsService.getSkillById(this.skillId).subscribe({
      next: (data: ISkill) => {
        this.myForm.patchValue(data);
      },
      error: () => {
        this.errorMessage = 'Failed to load skill';
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

    this.skillsService.updateSkill(this.skillId, this.myForm.value).subscribe({
      next: () => {
        this.successMessage = 'Skill updated successfully';
      },
      error: () => {
        this.errorMessage = 'Failed to update skill';
      },
    });
  }
}