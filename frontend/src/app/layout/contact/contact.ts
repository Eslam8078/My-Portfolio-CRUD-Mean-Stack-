import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact-service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact: IContact = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  sendMessage(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.sendMessage(this.contact).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.contact = {
          name: '',
          email: '',
          subject: '',
          message: '',
        };
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to send message';
        this.cdr.detectChanges();
      },
    });
  }
}