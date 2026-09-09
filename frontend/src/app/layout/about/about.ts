import { Component, OnInit } from '@angular/core';
import { IAbout } from '../../core/models/about.model';
import { AboutService } from '../../core/services/about-service';
import { resolveAssetUrl } from '../../core/utils/asset-url';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  about: IAbout | null = null;
  loading = true;
  errorMessage = '';

  constructor(private readonly aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.about = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load about data. Please try again.';
      },
    });
  }

  imageUrl(url: string): string {
    return resolveAssetUrl(url);
  }
}
