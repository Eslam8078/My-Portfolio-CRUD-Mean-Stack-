import { Component, OnInit } from '@angular/core';
import { IHome } from '../../core/models/home.model';
import { HomeService } from '../../core/services/home-service';
import { resolveAssetUrl } from '../../core/utils/asset-url';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  home: IHome | null = null;
  loading = true;
  errorMessage = '';

  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: (data) => {
        this.home = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load home data. Please try again.';
      },
    });
  }

  imageUrl(url: string): string {
    return resolveAssetUrl(url);
  }

  resumeUrl(url: string): string {
    return resolveAssetUrl(url);
  }
}
