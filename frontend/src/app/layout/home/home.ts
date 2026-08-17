import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IHome } from '../../core/models/home.model';
import { HomeService } from '../../core/services/home-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  private apiURL = 'http://localhost:3000';

  home: IHome | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: (data) => {
        this.home = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load home data. Please try again.';
        this.cdr.detectChanges();
      },
    });
  }

  imageUrl(url: string): string {
    return url?.startsWith('http') ? url : `${this.apiURL}${url}`;
  }

  resumeUrl(url: string): string {
    return url.startsWith('http') ? url : `${this.apiURL}${url}`;
  }
}
