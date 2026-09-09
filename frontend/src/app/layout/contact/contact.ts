import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact-service';

const EMPTY_CONTACT: IContact = { name: '', email: '', subject: '', message: '' };

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact: IContact = { ...EMPTY_CONTACT };
  successMessage = '';
  errorMessage = '';

  constructor(private readonly contactService: ContactService) {}

  sendMessage(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.sendMessage(this.contact).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.contact = { ...EMPTY_CONTACT };
      },
      error: () => {
        this.errorMessage = 'Failed to send message';
      },
    });
  }
}
