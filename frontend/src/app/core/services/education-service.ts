import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IEducation } from '../models/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private readonly apiUrl = `${environment.apiBaseUrl}/education`;

  constructor(private readonly http: HttpClient) {}

  getEducation() {
    return this.http.get<IEducation[]>(this.apiUrl, { params: { t: Date.now() } });
  }

  getEducationById(id: string) {
    return this.http.get<IEducation>(`${this.apiUrl}/${id}`);
  }

  addEducation(data: IEducation) {
    return this.http.post<IEducation>(this.apiUrl, data);
  }

  updateEducation(id: string, data: IEducation) {
    return this.http.put<IEducation>(`${this.apiUrl}/${id}`, data);
  }

  deleteEducation(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
