import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ISkill } from '../../../core/models/skills.model';
import { SkillsService } from '../../../core/services/skills-service';

@Component({
  selector: 'app-skills-list',
  imports: [RouterLink],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.css',
})
export class SkillsList implements OnInit {
  skills: ISkill[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private skillsService: SkillsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(): void {
    this.skillsService.getSkills().subscribe({
      next: data => {
        this.skills = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load skills';
        this.cdr.detectChanges();
      },
    });
  }

  deleteSkill(id: string): void {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    this.successMessage = '';
    this.errorMessage = '';

    this.skillsService.deleteSkill(id).subscribe({
      next: () => {
        this.successMessage = 'Skill deleted successfully';
        this.getSkills();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to delete skill';
        this.cdr.detectChanges();
      },
    });
  }
}