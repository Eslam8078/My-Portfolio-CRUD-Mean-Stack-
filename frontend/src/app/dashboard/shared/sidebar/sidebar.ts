import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContactService } from '../../../core/services/contact-service';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  unreadCount = 0;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUnreadCount();
  }

  getUnreadCount(): void {
    this.contactService.getMessages().subscribe({
      next: messages => {
        this.unreadCount = messages.filter(
          message => message.unread === true
        ).length;

        this.cdr.detectChanges();
      },

      error: () => {
        this.unreadCount = 0;
        this.cdr.detectChanges();
      }
    });
  }
}