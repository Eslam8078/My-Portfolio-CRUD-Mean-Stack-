import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEducation } from '../models/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiURL = 'http://localhost:3000/api/education';

  constructor(private http: HttpClient) {}

  getEducation() {
    return this.http.get<IEducation[]>(this.apiURL, { params: { t: Date.now() } });
  }

  getEducationById(id: string) {
    return this.http.get<IEducation>(`${this.apiURL}/${id}`);
  }

  addEducation(data: IEducation) {
    return this.http.post<IEducation>(this.apiURL, data);
  }

  updateEducation(id: string, data: IEducation) {
    return this.http.put<IEducation>(`${this.apiURL}/${id}`, data);
  }

  deleteEducation(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
