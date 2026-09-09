import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact-service';

@Component({
  selector: 'app-messages',
  imports: [DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  messages: IContact[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private readonly contactService: ContactService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.contactService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load messages';
      },
    });
  }

  deleteMessage(id: string): void {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.deleteMessage(id).subscribe({
      next: () => {
        this.successMessage = 'Message deleted successfully';
        this.getMessages();
      },
      error: () => {
        this.errorMessage = 'Failed to delete message';
      },
    });
  }

  markAsRead(message: IContact): void {
    if (!message._id || !message.unread) {
      return;
    }

    this.contactService.markAsRead(message._id).subscribe({
      next: () => {
        message.unread = false;
      },
      error: () => {
        this.errorMessage = 'Failed to mark message as read';
      },
    });
  }
}
