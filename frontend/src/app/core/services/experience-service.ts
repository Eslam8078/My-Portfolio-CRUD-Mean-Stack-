import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExperience } from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpClient) {}
  private apiURL = 'http://localhost:3000/api/experience';

   getExperience() {
    return this.http.get<IExperience[]>(this.apiURL, { params: { t: Date.now() } });
  }
  getExperienceById(id: string) {
    return this.http.get<IExperience>(`${this.apiURL}/${id}`);
  }
  addExperience(data: IExperience) {
    return this.http.post<IExperience>(this.apiURL, data);
  }
  updateExperience(id: string, data: IExperience) {
    return this.http.put<IExperience>(`${this.apiURL}/${id}`, data);
  }
  deleteExperience(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
