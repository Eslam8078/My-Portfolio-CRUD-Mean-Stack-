import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../models/projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}
  private apiURL = 'http://localhost:3000/api/projects';

   getProjects() {
    return this.http.get<IProject[]>(this.apiURL, { params: { t: Date.now() } });
  }
  getProjectById(id: string) {
    return this.http.get<IProject>(`${this.apiURL}/${id}`);
  }
  addProject(data: IProject) {
    return this.http.post<IProject>(this.apiURL, data);
  }
  updateProject(id: string, data: IProject) {
    return this.http.put<IProject>(`${this.apiURL}/${id}`, data);
  }
  deleteProject(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
