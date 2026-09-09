import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAbout } from '../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly apiUrl = `${environment.apiBaseUrl}/about`;

  constructor(private readonly http: HttpClient) {}

  getAbout() {
    return this.http.get<IAbout>(this.apiUrl, { params: { t: Date.now() } });
  }

  updateAbout(formData: FormData) {
    return this.http.put<IAbout>(this.apiUrl, formData);
  }
}
