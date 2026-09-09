import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IContact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = `${environment.apiBaseUrl}/contact`;

  constructor(private readonly http: HttpClient) {}

  sendMessage(data: IContact) {
    return this.http.post<IContact>(this.apiUrl, data);
  }

  getMessages() {
    return this.http.get<IContact[]>(this.apiUrl, { params: { t: Date.now() } });
  }

  deleteMessage(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  markAsRead(id: string) {
    return this.http.patch<IContact>(`${this.apiUrl}/${id}/read`, {});
  }
}
