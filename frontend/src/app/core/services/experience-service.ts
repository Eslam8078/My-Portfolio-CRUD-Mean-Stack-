import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IExperience } from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private readonly apiUrl = `${environment.apiBaseUrl}/experience`;

  constructor(private readonly http: HttpClient) {}

  getExperience() {
    return this.http.get<IExperience[]>(this.apiUrl, { params: { t: Date.now() } });
  }

  getExperienceById(id: string) {
    return this.http.get<IExperience>(`${this.apiUrl}/${id}`);
  }

  addExperience(data: IExperience) {
    return this.http.post<IExperience>(this.apiUrl, data);
  }

  updateExperience(id: string, data: IExperience) {
    return this.http.put<IExperience>(`${this.apiUrl}/${id}`, data);
  }

  deleteExperience(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
