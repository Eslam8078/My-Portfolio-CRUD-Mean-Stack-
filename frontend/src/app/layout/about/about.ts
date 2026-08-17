import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAbout } from '../../core/models/about.model';
import { AboutService } from '../../core/services/about-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  private apiURL = 'http://localhost:3000';

  about: IAbout | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private aboutService: AboutService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.about = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load about data. Please try again.';
        this.cdr.detectChanges();
      },
    });
  }

  imageUrl(url: string): string {
    return url.startsWith('http') ? url : `${this.apiURL}${url}`;
  }
}
