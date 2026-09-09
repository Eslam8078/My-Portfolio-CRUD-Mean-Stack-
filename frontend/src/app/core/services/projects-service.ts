import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IProject } from '../models/projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apiUrl = `${environment.apiBaseUrl}/projects`;

  constructor(private readonly http: HttpClient) {}

  getProjects() {
    return this.http.get<IProject[]>(this.apiUrl, { params: { t: Date.now() } });
  }

  getProjectById(id: string) {
    return this.http.get<IProject>(`${this.apiUrl}/${id}`);
  }

  addProject(data: IProject) {
    return this.http.post<IProject>(this.apiUrl, data);
  }

  updateProject(id: string, data: IProject) {
    return this.http.put<IProject>(`${this.apiUrl}/${id}`, data);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
