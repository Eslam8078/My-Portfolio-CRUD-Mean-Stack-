import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  private apiURL = 'http://localhost:3000/api/contact';

  sendMessage(data: IContact) {
    return this.http.post<IContact>(this.apiURL, data);
  }
  getMessages() {
    return this.http.get<IContact[]>(this.apiURL, { params: { t: Date.now() } });
  }
  deleteMessage(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  markAsRead(id: string) {
    return this.http.patch<IContact>(`${this.apiURL}/${id}/read`, {});
  }
}
