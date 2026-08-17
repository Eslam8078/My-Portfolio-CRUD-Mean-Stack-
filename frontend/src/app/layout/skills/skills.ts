import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISkill } from '../../core/models/skills.model';
import { SkillsService } from '../../core/services/skills-service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  skills: ISkill[] = [];
  loading = true;
  errorMessage = '';

  constructor(private skillsService: SkillsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.skills = data ;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load skills. Please try again.';
        this.cdr.detectChanges();
      },
    });
  }
}
