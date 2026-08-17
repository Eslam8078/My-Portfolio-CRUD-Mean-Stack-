import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HomeService } from '../../../core/services/home-service';
import { IHome } from '../../../core/models/home.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  readonly apiHost = 'http://localhost:3000';
  home: IHome | null = null;

  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: data => {
        this.home = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.home = null;
        this.cdr.detectChanges();
      },
    });
  }

  resumeUrl(url: string): string {
    return url.startsWith('http') ? url : `${this.apiHost}${url}`;
  }
}