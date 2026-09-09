import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HomeService } from '../../../core/services/home-service';
import { AuthService } from '../../../core/auth/auth.service';
import { IHome } from '../../../core/models/home.model';
import { resolveAssetUrl } from '../../../core/utils/asset-url';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  home: IHome | null = null;

  constructor(
    private readonly homeService: HomeService,
    readonly auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: (data) => {
        this.home = data;
      },
      error: () => {
        this.home = null;
      },
    });
  }

  resumeUrl(url: string): string {
    return resolveAssetUrl(url);
  }
}
