import { Component, OnInit } from '@angular/core';
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
    private skillsService: SkillsService
  ) {}

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(): void {
    this.skillsService.getSkills().subscribe({
      next: data => {
        this.skills = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load skills';
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
      },
      error: () => {
        this.errorMessage = 'Failed to delete skill';
      },
    });
  }
}